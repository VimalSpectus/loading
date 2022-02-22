import React, { useEffect, useState } from 'react'
import classes from "./Loading.module.css"
import moment from 'moment'
import { Audio } from  'react-loader-spinner'

const Loading = () => {
    const [data, setData] = useState([]);
    const[pagenum, setPageNum]=useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        ApiCall(pagenum);
        setTimeout(function () {
          setPageNum(pagenum + 1);
        }, 10000);
      }, [pagenum]);

    const ApiCall = (value) => {

        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };
setLoading(true)
        fetch(
            "https://hn.algolia.com/api/v1/search_by_date?tags=story&page="+ value,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setData(result.hits);
            })
            .catch((error) => console.log("error", error))
            .finally(() => {
                setLoading(false);
              });
    }  
console.log(data);
    
    return (
        <div>
            <div className={classes.tbl_div}>
                <table className={classes.tbl_head}>
                    <thead>
                        <tr className={classes.head}>
                            <th className={classes.table_heading}>Titel</th>
                            <th className={classes.table_heading}>Author</th>
                            <th className={classes.table_heading}> Date</th>
                        </tr>
                    </thead>
                    {loading === true ? (
            <Audio color="#00BFFF" height={80} width={80} />
          ) : (
                    <tbody>
                        {data.map((item,index) => {
                            return(
                                <tr  key={index}>
                                <td className={classes.table_body}>{item.title}</td>
                                <td className={classes.table_body}>{item.author}</td>
                                <td className={classes.table_body}>
                               {moment(item.created_at).format('DD MMM YYYY')}
                                    </td>
                            </tr>
                            )

                        })}

                    </tbody>)}
                </table>
            </div>
        </div>
    )
}

export default Loading