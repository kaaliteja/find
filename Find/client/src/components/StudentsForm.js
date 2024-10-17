import React, { useEffect, useRef } from 'react'
import {useState} from "react";

function StudentsForm() {
   let[students,setStudents] = useState([]);
   let[collegesList,setCollegesList] = useState([]);
   let[backlogsList,setBacklogsList] = useState([]);
   let[gendersList,setGendersList] = useState([]);


   let collegesSelectRef=useRef();
   let backlogsSelectRef=useRef();
   let gendersSelectRef=useRef();


   useEffect(()=>{
    getCollegesList();
    getBacklogsList();
    getGendersList();
   },[]);

  let getCollegesList = async()=>{

    let reqOptions ={
      method:"GET",
    };
   
    let JSONData = await fetch("http://localhost:2024/collegesList",reqOptions);
    let JSOData = await JSONData.json();
    // console.log(JSOData);
    setCollegesList(JSOData);
  };

  let getBacklogsList = async()=>{

    let reqOptions ={
      method:"GET",
    };
   
    let JSONData = await fetch("http://localhost:2024/backlogsList",reqOptions);
    let JSOData = await JSONData.json();
    setBacklogsList(JSOData);
  };

  
  let getGendersList = async()=>{

   let  reqOptions ={
      method:"GET",
    };
   
    let JSONData = await fetch("http://localhost:2024/gendersList",reqOptions);
    let JSOData = await JSONData.json();
    setGendersList(JSOData);
  };



    let getStudentsFromServer = async()=>{

      let reqOptions = {
            method:"GET",
        };

        let url = `http://localhost:2024/students?college=${collegesSelectRef.current.value}&backlogs=${backlogsSelectRef.current.value}&gender=${
          gendersSelectRef.current.value}`;

          console.log(url);

          
        let url2 = `http://localhost:2024/students/${collegesSelectRef.current.value}/${backlogsSelectRef.current.value}/${
          gendersSelectRef.current.value}`;

          console.log(url2);

        let JSONData = await fetch(url2,reqOptions);

        let JSOData = await JSONData.json();
        setStudents(JSOData);

    }
  return (
    <div>
      <form>
        <div>
          <label>college</label>
          <select ref={collegesSelectRef}>
            {
             collegesList.map((ele,i)=>{
              return <option>{ele}</option>
             })
            }
          </select>
        </div>
        <div>
          <label>Backlogs</label>
          <select ref={backlogsSelectRef}>
          {
             backlogsList.map((ele,i)=>{
              return <option>{ele}</option>;
             })
            }
          </select>
        </div>
        <div>
          <label>Gender</label>
          <select ref={gendersSelectRef}>
           {
             gendersList.map((ele,i)=>{
              return <option>{ele}</option>
             })
            }
          </select>
        </div>
        <button type="button" onClick={()=>{
        getStudentsFromServer();
        }}>Get Students</button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Id</th>
                    <th>Profile Pic</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>college</th>
                    <th>Backlogs</th>
                    <th>Fee</th>
                </tr>
            </thead>
            <tbody>
            {students.map((ele,i)=>{
            return(
            <tr key={i}>
                    <td>{i}</td>
                    <td>{ele.id}</td>
                    <td>
                        <img src={ele.profilePic}></img>
                    </td>
                    <td>{ele.firstName}</td>
                    <td>{ele.lastName}</td>
                    <td>{ele.gender}</td>
                    <td>{ele.age}</td>
                    <td>{ele.email}</td>
                    <td>{ele.college}</td>
                    <td>{ele.backlogs}</td>
                    <td>{ele.fee}</td>
                </tr>
            );
        })}
            </tbody>
            <tfoot></tfoot>
        </table>
        
    
    </div>
  )
}

export default StudentsForm;
