// [id].js

import { getAllTupleIds, getAllTupleData } from '../../lib/tuple'
import Layout from '../../components/layout'

export async function getStaticPaths() {
  const paths = await getAllTupleIds()
  // console.log('paths: ', paths)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const tupleData = await getAllTupleData(params.id)
  // console.log('tupleData[', params.id, ']', tupleData)
  return {
    props: {
      tupleData
    }
  }

}

export default function Tuple({ tupleData }) {
    // console.log('tupleData2: ', tupleData)
    return (
      <Layout>
        <table>
          <thead>
            <tr key="header">
              <th>esp32</th>
              <th>Timestamp</th>
              <th>gpio</th>
              <th>Temp [deg]</th>
              <th>Hum [%]</th>
            </tr>
          </thead>
          <tbody>
          {tupleData.map((tuple) => {
            // console.log('tuple: ', tuple)
            return(
              <tr>
                <td>{tuple.id_key}</td>
                <td>{tuple.to_char}</td>
                <td>{tuple.gpio}</td>
                <td>{tuple.temp}</td>
                <td>{tuple.hum}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </Layout>
    )
}
