import React, { useState } from "react";
import { useHistory } from "react-router";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  Grid,
  TextField,
  makeStyles,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import aws from "aws-sdk";
import { promisify } from "util";
import crypto from "crypto";

import PhotoCamera from "@material-ui/icons/PhotoCamera";
import NetworkService from "src/services/NetworkService";

const useStyles = makeStyles((theme) => ({
  root: {},
  queryField: {
    width: 500,
  },
  bulkOperations: {
    position: "relative",
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: "absolute",
    width: "100%",
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  },
  bulkAction: {
    marginLeft: theme.spacing(2),
  },
  avatar: {
    height: 50,
    width: 50,
    marginRight: theme.spacing(1),
  },
  accordionHeader: {
    display: "flex",
    alignItems: "center",
  },
  accordiondetails: {
    display: "block",
  },
  memberHeading: {
    paddingLeft: 20,
    paddingBottom: 10,
    fontSize: 20,
  },
  singleMember: {
    padding: 10,
    display: "flex",
  },
  span: {
    padding: 5,
    display: "block",
  },
  ownerName: {
    fontSize: 13,
    color: "gray",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "block",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: "#FFFFFF",
  },
  semiHeading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteIcon: {
    color: "#d10000",
  },
  button: {
    margin: theme.spacing(1),
  },
  formMessageDiv: {
    padding: theme.spacing(3, 0, 3, 0),
    fontSize: 15,
  },
  formDiv: {
    padding: 10,
    display: "flex",
    justifyContent: "center",
  },
  textField: {
    width: "60ch",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 600,
    maxWidth: 600,
  },
  input: {
    display: "none",
  },
}));

const config = {
  // bucketName: 'makingmedia',
  region: "eu-west-2",
  accessKeyId: "AKIA4UJ2BONSUUVINZF6",
  secretAccessKey: "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",
  signatureVersion: "v4",
};

export default function Results({ className, users, ...rest }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [imageUpload, setImageUpload] = useState(null);
  const randomBytes = promisify(crypto.randomBytes);
  const s3 = new aws.S3(config);
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        owner: "",
        name: "",
      }}
      validationSchema={Yup.object().shape({
        owner: Yup.string().required(),
        name: Yup.string().required(),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // Do api call
          // setSubmitting(true);
          console.log("Submitted Data: ", values);

          if (imageUpload) {
            const rawBytes = await randomBytes(16);
            const imageName = rawBytes.toString("hex");

            const params = {
              Bucket: "makingmedia",
              Key: imageName,
              Expires: 60,
            };

            const uploadUrl = await s3.getSignedUrlPromise("putObject", params);

            await fetch(uploadUrl, {
              method: "PUT",
              headers: {
                "Content-Type": "multipart/form-data",
              },
              body: imageUpload,
            });

            const imageUrl = uploadUrl.split("?")[0];

            NetworkService.addNetwork({
              image: imageUrl,
              owner: values.owner,
              name: values.name,
            })
              .then((res) => {
                enqueueSnackbar("Network Created Successfully", {
                  variant: "success",
                });
                history.push("/app/management/networks");
              })
              .catch((err) => {
                console.log(err);
                enqueueSnackbar("Error While Creating New Network", {
                  variant: "error",
                });
              });
          } else {
            enqueueSnackbar("Kindly select an image", {
              variant: "error",
            });
          }
        } catch (err) {
          console.log(err);
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Grid container spacing={3}>
            <Grid item>
              <Card>
                <CardContent>
                  <Box mt={3} mb={1}>
                    <input
                      accept="image/*"
                      onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                      }}
                      className={classes.input}
                      id="networkIcon"
                      type="file"
                    />
                    <label htmlFor="networkIcon">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera />
                      </IconButton>
                      {imageUpload && imageUpload.name}
                    </label>
                  </Box>
                  <Box mt={3} mb={1}>
                    <TextField
                      className={classes.formControl}
                      error={Boolean(touched.owner && errors.owner)}
                      helperText={touched.owner && errors.owner}
                      fullWidth
                      select
                      label="Owner"
                      name="owner"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.owner}
                      variant="outlined"
                    >
                      {users.map((user) => (
                        <MenuItem
                          value={`${user._id}`}
                        >{`${user.firstName} ${user.lastName}`}</MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <Box mt={3} mb={1}>
                    <TextField
                      className={classes.formControl}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                      fullWidth
                      label="Network Name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Create New Network
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}
