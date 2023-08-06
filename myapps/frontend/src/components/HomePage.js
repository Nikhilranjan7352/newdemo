import React, { useState, useEffect,useRef } from "react";
import { Modal,Card,Form,Alert,Table,Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


import 'react-pdf/dist/esm/Page/AnnotationLayer.css';


import { BsFillInfoCircleFill } from 'react-icons/bs';
import axios from 'axios'

import config from "../clientconfig.json"
// import dotenv from 'dotenv';




// import readXlsxFile from 'read-excel-file'
import * as XLSX from 'xlsx'
// const PDFViewer = ({ pdfUrl }) => {
//   return (
//     <Card title="PDF Viewer">
//       <Document file={pdfUrl}>
//         <Page pageNumber={1} />
//       </Document>
//     </Card>
//   );
// };

const HomePage = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [info,setInfo]=useState(false)
  const[infoMessage,setInfoMessage]=useState("ggg")
  const alertRef = useRef(null);
  const [columnsdata, setUserColumns] = useState([]);
  const [rowdata, setUsersRow] = useState([]);
  const[pageid,setId]=useState("")
  const [useremail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cc, setCc] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal,sertShowModal]=useState(false)
  const [logarray,setLogArray]=useState([])

  useEffect(() => {
    console.log(config);
    axios.get(config.REACT_APP_BACKEND_URL)
      .then(response => {
        // Handle the response data
        console.log(response.data);
        const val=response.data

        setId(val);
        console.log(val)
        console.log("page",pageid)
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  
    
  
    return () => {
     
    };
  }, []);

  useEffect(() => {
    console.log('pageid', pageid);
  }, [pageid]);
  
  
  
  function handleFileSelect() {
    const file = selectedFile
    
  const formData = new FormData();
  const dataarr=[pageid,useremail,password,cc,subject,body,columnsdata,rowdata]
  console.log(dataarr)

  formData.append('uploadLocation',JSON.stringify(dataarr));
  formData.append('file', file);
 

  
  
  
  axios.post(config.REACT_APP_BACKEND_URL+'/oop', formData)
  .then(response => {
    // Handle the response data
    console.log(response.data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });


  }
  function callEndpoint() {
    const data = {
      variable1: 'value1',
      variable2: 'value2'
    };
  
    axios.post(config.REACT_APP_BACKEND_URL+'/oop', data)
      .then(response => {
        // Handle the response data
        console.log(response.data);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }
  const getLogs = () => {
    const data = {
      pageid: pageid,
      
    };
  
    axios.post(config.REACT_APP_BACKEND_URL + '/getLogs', data)
      .then(response => {
        // Handle the response data
        console.log(response.data);
        setLogArray(response.data)
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  };
 
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "array" });
        // console.log(wb)

        const wsname = wb.SheetNames[0];
        var cells = Object.keys(wb);
        console.log("cells",cells)
        // console.log(wsname)

        const ws = wb.Sheets[wsname];
        // console.log(ws)

        const data = XLSX.utils.sheet_to_json(ws, {
          skipHeader:false,
         
          header: 'A',
          
        });
        setUsersRow(data)
        const worksheettemp = XLSX.utils.json_to_sheet(data);
  console.log("x",worksheettemp)
        const data2=XLSX.utils.sheet_to_json(ws);
        console.log(data)
         let column=[]
         Object.keys(data[0]).forEach(key => {
          const value = data[0][key];
          const formattedValue = `{${String(value)}}`;
          column.push(formattedValue);
        });
        setUserColumns([...column])
      

        resolve(data);
        // console.log(data)
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      // setItems(d);
    });
  };
  const handleClose = () => {
    setInfo(false);
  };
 
  return (
    <>
  
    <Modal
        show={showModal}
        onHide={()=>{sertShowModal(false)

        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', marginBottom: '20px' }}>
      <h5 style={{ marginRight: '10px' }}>Click this button to submit your request</h5>
      <Button style={{ backgroundColor: '#e6f2ff', color: '#000000', padding: '10px 20px', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', transition: 'background-color 0.3s ease' }} onClick={()=>{handleFileSelect()
      const interval = setInterval(() => {
        if (rowdata.length === logarray.length +1) {
          clearInterval(interval);
        } else {
          getLogs();
        }
      }, 2000);
      }}
      >
        Send Email
      </Button>
    </div>
          <Card style={{ width: '100%',background:"#EAF2F8"}}>
            <Card.Title>
              Your Logs will appear as soon as you submit your request<br></br>
            </Card.Title>
          <Card.Body>
            {logarray.map(log=>(
              <>{log}
              <br></br>
              </>
            ))}

          </Card.Body>


          </Card>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{
            sertShowModal(false)
          }}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    {info&&(<Alert ref={alertRef} variant={"Primary"}>
    <Button
            onClick={handleClose}
            variant="link"
            className="close"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </Button>
          {infoMessage}
        </Alert>)}
    <div style={{ display: "flex", justifyContent: "center" }}>
    <Card style={{ width: '28rem',background:"#EAF2F8"}}>
      
      <Card.Body>
       
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={useremail}
        
        onChange={(e)=>{
          setEmail(e.target.value)
          console.log(useremail)
        }} 
        
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" value={password}>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCc">
        <Form.Label>CC</Form.Label>
        <Form.Control type="text" value={cc}  onChange={(e) => setCc(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formSubject">
        <Form.Label>Subject</Form.Label>
        <Form.Control type="text" value={subject} onChange={(e) => setSubject(e.target.value)}  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBody">
        <Form.Label>Body</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
         
        />
      </Form.Group>
      <br></br>
      <div className="dotted-line"></div>

      Now Upload the excel sheet containg the information , having email in first column . 
    
     
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label></Form.Label>
        <Form.Control type="file" placeholder="Upload your file"  onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
          accept=".xlsx,.xlx" />
       
      </Form.Group>
      <Card style={{ width: '25rem',background:"white",minHeight:"10rem"}} >
        <Card.Title style={{fontSize:'12px'}}>
          Your Keys will display here once u upload excel<BsFillInfoCircleFill
        onClick={()=>{
          console.log("heh")
          
          callEndpoint()
          setInfoMessage("The Keys are basically variables that you should replace in your email body and attachment file in order for us to use them and fetch information from the excel you uploaded , you can change your columnnames , if u wish to have different names")
        console.log("gdgdggd")
        setInfo(true)
      
      }
      
      }  
          
          
          />
        </Card.Title>
        <Card.Body>
        <div className="dotted-line2"></div>
        <Table>
         
      <tbody>
        {columnsdata.map((data, index) => (
          <tr >
           <td>{`{${data.toLowerCase().replace(/\s/g, '')}}`}</td>
            <br></br>
          </tr>
        ))}
      </tbody>
    </Table>
    <div className="dotted-line2"></div>
          
          </Card.Body>

      </Card>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Upload you sample doc file replacing the variables</Form.Label>
        <Form.Control type="file" placeholder="Upload your file" accept=".pdf" onChange={(e)=>{
          console.log("some changed")
          setSelectedFile(e.target.files[0])
          // handleFileSelect(e) 

        }} />
       
      </Form.Group>
      <Button variant="primary" 
      onClick={()=>{
        console.log(cc)
          console.log(subject)
          console.log(password)
          // handleFileSelect()
          sertShowModal(true)

      }}
      >
        Submit
      </Button>
    </Form>
         
         
     
        
       
      </Card.Body>
    </Card>
    
    </div>
    </>
  );
};

export default HomePage;
