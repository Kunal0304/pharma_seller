import React, { useState,useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  CardSubtitle,
  Container,
} from "reactstrap";
import {
  Label,
  Button,
  Input,
  InputGroup,
} from "reactstrap";

import { useSelector, useDispatch } from "react-redux";
import { Alert, FormFeedback } from "reactstrap";
import Dropzone from "react-dropzone";

import * as Yup from "yup";
import { useFormik } from "formik";

// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { Link } from "react-router-dom";

import {
  getShopCompliance, saveShopCompliance
} from "store/actions";

const ComplianceMedical = () => {

  //meta title
  document.title = "Complaince Form | Medimny";

  const [selectedFiles, setselectedFiles] = useState([]);
  const [lic20bfile, setlic20bfile] = useState([]);
  const [lic21bfile, setlic21bfile] = useState([]);
  const [licfssaifile, setlicfssaifile] = useState([]);
  const [licgstfile, setlicgstfile] = useState([]);

  const[lic20bno,setlic20bno] = useState('');
  const[lic20bdate,setlic20bdate] = useState('');
  const[lic21bno,setlic21bno] = useState('');
  const[lic21bdate,setlic21bdate] = useState('');
  const[licgstno,setlicgstno] = useState('');
  const [licgstdate,setlicgstdate] = useState('');
  const[licfssaino,setlicfssaino] = useState('');
  const [licfssaidate,setlicfssaidate] = useState('');

  function handleAcceptedFiles(files, sets) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    if (sets == 'lic21bfile') {
      setlic21bfile(files)
      validation.setFieldValue("lic21bfile", files);

    } else if (sets == 'lic20bfile') {
      validation.setFieldValue("lic20bfile", files);
      setlic20bfile(files)

    } else if (sets == 'licfssaifile') {
      validation.setFieldValue("licfssaifile", files);
      setlicfssaifile(files)

    } else if (sets == 'licgstfile') {
      validation.setFieldValue("licgstfile", files);
      setlicgstfile(files)
    }

  }


  const { error } = useSelector(state => ({
    error: state.StaffReducer.error_compliances,
}));

const { complainces } = useSelector(state => ({
  complainces: state.StaffReducer.complainces,
}));

const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this  flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      lic20bno: lic20bno,
      lic20bdate: lic20bdate,
      lic20bfile: [],
      lic21bfile: [],
      lic21bno: lic21bno,
      lic21bdate: lic21bdate,
      licfssaifile: [],
      licfssaino: licfssaino,
      licfssaidate: licfssaidate,
      licgstfile: '',
      licgstno: licgstno,
      licgstdate: licgstdate
    },
    validationSchema: Yup.object({
      lic20bno: Yup.string().required("Please Enter  lic20bno"),
      lic21bno: Yup.string().required("Please Enter  lic21bno"),
      lic20bdate: Yup.string().required("Please Select  lic20bdate"),
      lic21bdate: Yup.string().required("Please Select  lic21bdate"),
      // licfssaino: Yup.string().required("Please Enter  licfssaino"),
      // licgstno: Yup.string().required("Please Enter  licgstno"),
      //   group_type: Yup.array().min(1).required().label('Group Type'),
    }),
    onSubmit: (values) => {
      dispatch(saveShopCompliance(values));
      window.location.reload();
    }
  });


  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  useEffect(() => {
    if (!complainces) {
        dispatch(getShopCompliance());
    }

   // if(compliances){

     setlic20bno(complainces?.lic20bno);
     setlic20bdate(complainces?.lic20bdate);
     setlic21bno(complainces?.lic21bno);
     setlic21bdate(complainces?.lic21bdate);
     setlicgstno(complainces?.licgstno);
     setlicgstdate(complainces?.licgstdate);
     setlicfssaino(complainces?.licfssaino);
     setlicfssaidate(complainces?.licfssaidate);

     validation.initialValues= {
      lic20bno: lic20bno,
      lic20bdate: lic20bdate,
      lic20bfile: [],
      lic21bfile: [],
      lic21bno: lic21bno,
      lic21bdate: lic21bdate,
      licfssaifile: [],
      licfssaino: licfssaino,
      licfssaidate: licfssaidate,
      licgstfile: [],
      licgstno: licgstno,
      licgstdate: licgstdate
    }

   // }
    console.log(complainces, 'compliances')
}, [dispatch, complainces]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Seller" breadcrumbItem="Seller Compliances" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <h6 className="card-title">Compliance Forms</h6>
                  <CardSubtitle className="mb-3">
                    {/* {" "}
                    DropzoneJS is an open source library that provides
                    drag’n’drop file uploads with image previews. */}
                  </CardSubtitle>
                  <Form encType="multipart/form-data"
                                              className="form-horizontal"
                                              onSubmit={(e) => {
                                                  e.preventDefault();
                                                  validation.handleSubmit();
                                                  return false;
                                              }}
                  >
                    
                    <Row>
                      <Col md={3}>
                        <Dropzone
                          onDrop={acceptedFiles => {
                            handleAcceptedFiles(acceptedFiles, 'lic20bfile')
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div className="dropzone">
                              <div
                                className="dz-message needsclick mt-2"
                                {...getRootProps()}
                              >
                                <input {...getInputProps()} />
                                <div className="mb-3">
                                  <i className="display-4 text-muted bx bxs-cloud-upload" />
                                </div>
                                <h4>Drop Drug Lic 20B files here or click to upload.</h4>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        <div className="dropzone-previews mt-3" id="file-previews">
                          {lic20bfile.map((f, i) => {
                            return (
                              <Card
                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                key={i + "-file"}
                              >
                                <div className="p-2">
                                  <Row className="align-items-center">
                                    <Col className="col-auto">
                                      <img
                                        data-dz-thumbnail=""
                                        height="80"
                                        className="avatar-sm rounded bg-light"
                                        alt={f.name}
                                        src={f.preview}
                                      />
                                    </Col>
                                    <Col>
                                      <Link
                                        to="#"
                                        className="text-muted font-weight-bold"
                                      >
                                        {f.name}
                                      </Link>
                                      <p className="mb-0">
                                        <strong>{f.formattedSize}</strong>
                                      </p>
                                    </Col>
                                  </Row>
                                </div>
                              </Card>
                            )
                          })}
                        </div>
                        <div className="dropzone-previews mt-3" id="file-previews">

                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          >
                            <div className="p-2">
                              <Row className="align-items-center">

                                <Col>
                                  <Input
                                    name="lic20bno"
                                    value={validation.values.lic20bno || ""}
                                    type="text"
                                    placeholder="Enter lic20bno"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                      validation.touched.lic20bno && validation.errors.lic20bno ? true : false
                                    }
                                  />
                                  {validation.touched.lic20bno && validation.errors.lic20bno ? (
                                    <FormFeedback type="invalid">{validation.errors.lic20bno}</FormFeedback>
                                  ) : null}

                                </Col>
                                <Col>

                                  <p className="mb-0">
                                    <div className="col-md-10">
                                      <Input
                                        className="form-control"
                                        type="date"
                                        defaultValue={lic20bdate}
                                        id="example-date-input"
                                        name="lic20bdate"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        invalid={
                                          validation.touched.lic20bdate && validation.errors.lic20bdate ? true : false
                                        }
                                      />
                                      {validation.touched.lic20bdate && validation.errors.lic20bdate ? (
                                        <FormFeedback type="invalid">{validation.errors.lic20bdate}</FormFeedback>
                                      ) : null}
                                    </div>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>

                        </div>
                      </Col>

                      <Col md={3}>
                        <Dropzone
                          onDrop={acceptedFiles => {
                            handleAcceptedFiles(acceptedFiles, 'lic21bfile')
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div className="dropzone">
                              <div
                                className="dz-message needsclick mt-2"
                                {...getRootProps()}
                              >
                                <input {...getInputProps()} />
                                <div className="mb-3">
                                  <i className="display-4 text-muted bx bxs-cloud-upload" />
                                </div>
                                <h4>Drop Drug Lic 21B files here or click to upload.</h4>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        <div className="dropzone-previews mt-3" id="file-previews">
                          {lic21bfile.map((f, i) => {
                            return (
                              <Card
                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                key={i + "-file"}
                              >
                                <div className="p-2">
                                  <Row className="align-items-center">
                                    <Col className="col-auto">
                                      <img
                                        data-dz-thumbnail=""
                                        height="80"
                                        className="avatar-sm rounded bg-light"
                                        alt={f.name}
                                        src={f.preview}
                                      />
                                    </Col>
                                    <Col>
                                      <Link
                                        to="#"
                                        className="text-muted font-weight-bold"
                                      >
                                        {f.name}
                                      </Link>
                                      <p className="mb-0">
                                        <strong>{f.formattedSize}</strong>
                                      </p>
                                    </Col>
                                  </Row>
                                </div>
                              </Card>
                            )
                          })}
                        </div>
                        <div className="dropzone-previews mt-3" id="file-previews">

                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          >
                            <div className="p-2">
                              <Row className="align-items-center">

                                <Col>
                                  <Input
                                    name="lic21bno"
                                    value={validation.values.lic21bno || ""}
                                    type="text"
                                    placeholder="Enter lic21bno"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                      validation.touched.lic21bno && validation.errors.lic21bno ? true : false
                                    }
                                  />
                                  {validation.touched.lic21bno && validation.errors.lic21bno ? (
                                    <FormFeedback type="invalid">{validation.errors.lic21bno}</FormFeedback>
                                  ) : null}

                                </Col>
                                <Col>

                                  <p className="mb-0">
                                    <div className="col-md-10">
                                      <Input
                                        className="form-control"
                                        type="date"
                                        defaultValue={lic21bdate}
                                        id="example-date-input"
                                        name="lic21bdate"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        invalid={
                                          validation.touched.lic21bdate && validation.errors.lic21bdate ? true : false
                                        }
                                      />
                                      {validation.touched.lic21bdate && validation.errors.lic21bdate ? (
                                        <FormFeedback type="invalid">{validation.errors.lic21bdate}</FormFeedback>
                                      ) : null}
                                    </div>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>

                        </div>
                      </Col>

                      <Col md={3}>
                        <Dropzone
                          onDrop={acceptedFiles => {
                            handleAcceptedFiles(acceptedFiles, 'licfssaifile')
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div className="dropzone">
                              <div
                                className="dz-message needsclick mt-2"
                                {...getRootProps()}
                              >
                                <input {...getInputProps()} />
                                <div className="mb-3">
                                  <i className="display-4 text-muted bx bxs-cloud-upload" />
                                </div>
                                <h4>Drop FSSAI Lic (Optional) files here or click to upload.</h4>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        <div className="dropzone-previews mt-3" id="file-previews">
                          {licfssaifile.map((f, i) => {
                            return (
                              <Card
                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                key={i + "-file"}
                              >
                                <div className="p-2">
                                  <Row className="align-items-center">
                                    <Col className="col-auto">
                                      <img
                                        data-dz-thumbnail=""
                                        height="80"
                                        className="avatar-sm rounded bg-light"
                                        alt={f.name}
                                        src={f.preview}
                                      />
                                    </Col>
                                    <Col>
                                      <Link
                                        to="#"
                                        className="text-muted font-weight-bold"
                                      >
                                        {f.name}
                                      </Link>
                                      <p className="mb-0">
                                        <strong>{f.formattedSize}</strong>
                                      </p>
                                    </Col>
                                  </Row>
                                </div>
                              </Card>
                            )
                          })}
                        </div>
                        <div className="dropzone-previews mt-3" id="file-previews">

                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          >
                            <div className="p-2">
                              <Row className="align-items-center">

                                <Col>
                                  <Input
                                    name="licfssaino"
                                    value={validation.values.licfssaino || ""}
                                    type="text"
                                    placeholder="Enter licfssaino"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                      validation.touched.licfssaino && validation.errors.licfssaino ? true : false
                                    }
                                  />
                                  {validation.touched.licfssaino && validation.errors.licfssaino ? (
                                    <FormFeedback type="invalid">{validation.errors.lic20bno}</FormFeedback>
                                  ) : null}

                                </Col>
                                <Col>

                                  <p className="mb-0">
                                    <div className="col-md-10">
                                      <Input
                                        className="form-control"
                                        type="date"
                                        defaultValue={licfssaidate}
                                        
                                        id="example-date-input"
                                        name="licfssaidate"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        invalid={
                                          validation.touched.licfssaidate && validation.errors.licfssaidate ? true : false
                                        }
                                      />
                                      {validation.touched.licfssaidate && validation.errors.licfssaidate ? (
                                        <FormFeedback type="invalid">{validation.errors.licfssaidate}</FormFeedback>
                                      ) : null}
                                    </div>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>

                        </div>
                      </Col>

                      <Col md={3}>
                        <Dropzone
                          onDrop={acceptedFiles => {
                            handleAcceptedFiles(acceptedFiles, 'licgstfile')
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div className="dropzone">
                              <div
                                className="dz-message needsclick mt-2"
                                {...getRootProps()}
                              >
                                <input {...getInputProps()} />
                                <div className="mb-3">
                                  <i className="display-4 text-muted bx bxs-cloud-upload" />
                                </div>
                                <h4>Drop GSTN Lic (Optional) files here or click to upload.</h4>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        <div className="dropzone-previews mt-3" id="file-previews">
                          {licgstfile.map((f, i) => {
                            return (
                              <Card
                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                key={i + "-file"}
                              >
                                <div className="p-2">
                                  <Row className="align-items-center">
                                    <Col className="col-auto">
                                      <img
                                        data-dz-thumbnail=""
                                        height="80"
                                        className="avatar-sm rounded bg-light"
                                        alt={f.name}
                                        src={f.preview}
                                      />
                                    </Col>
                                    <Col>
                                      <Link
                                        to="#"
                                        className="text-muted font-weight-bold"
                                      >
                                        {f.name}
                                      </Link>
                                      <p className="mb-0">
                                        <strong>{f.formattedSize}</strong>
                                      </p>
                                    </Col>
                                  </Row>
                                </div>
                              </Card>
                            )
                          })}
                        </div>
                        <div className="dropzone-previews mt-3" id="file-previews">

                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          >
                            <div className="p-2">
                              <Row className="align-items-center">

                                <Col>
                                  <Input
                                    name="licgstno"
                                    value={validation.values.licgstno || ""}
                                    type="text"
                                    placeholder="Enter Name"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                      validation.touched.licgstno && validation.errors.licgstno ? true : false
                                    }
                                  />
                                  {validation.touched.licgstno && validation.errors.licgstno ? (
                                    <FormFeedback type="invalid">{validation.errors.licgstno}</FormFeedback>
                                  ) : null}

                                </Col>
                                <Col>

                                  <p className="mb-0">
                                    <div className="col-md-10">
                                      <Input
                                        className="form-control"
                                        type="date"
                                        defaultValue={licgstdate}
                                        id="example-date-input"
                                        name="licgstdate"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        invalid={
                                          validation.touched.licgstdate && validation.errors.licgstdate ? true : false
                                        }
                                      />
                                      {validation.touched.licgstdate && validation.errors.licgstdate ? (
                                        <FormFeedback type="invalid">{validation.errors.licgstdate}</FormFeedback>
                                      ) : null}
                                    </div>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>

                        </div>
                      </Col>




                    </Row>

             

                  <div className="text-center mt-4">
                    
                    <button type="submit" className="btn btn-primary">SUMBIT</button>
                  </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ComplianceMedical
