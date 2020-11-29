import React,{useEffect} from 'react';
import './App.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {useStateValue} from './StateProvider';
import moment from 'moment';

const client = new W3CWebSocket('ws://stocks.hulqmedia.com');

function App() {
  
  const [,dispatch] = useStateValue();
  const [{data}] = useStateValue();
  
  useEffect(()=>{
    client.onopen=()=>{
      console.log('Run Success.');
    };

  client.onmessage=(msg)=>{
    const serverData = JSON.parse(msg.data);
    serverData.map((sd)=>(

      dispatch({
        type: "UPDATE_STOCKS",
        data:{

          name:sd[0],
          price:sd[1],
          status: '',
          time:moment().format('MMMM Do , h:mm:ss a')
          ,
        }
      })
    ))}
  },[dispatch]);

  //console.log(data);
  
  return (
    <div className="App">
      <Table  bordered>
        <tbody>
          <tr className='th tableR'>
            <th>NAME</th>
            <th>PRICE</th>
            <th>LAST UPDATE</th>
          </tr>
            {
              data?.map((data1)=>( 
                <tr className='tableR'>
                  <td><b>{data1.name} </b></td>
                  <td className={`${data1.status}`}><b>{data1.price.toFixed(2)}</b></td>
                  <td>{data1.time} </td>
                </tr>
              )) 
            }
          </tbody>
      </Table>
    </div>
  );
}
export default App;
