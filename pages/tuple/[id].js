// [id].js

import { getAllTupleIds, getAllTupleData } from '../../lib/tuple'
import Layout from '../../components/layout'
import styles from '../../styles/Tuple.module.css'

export async function getStaticPaths() {
  const paths = await getAllTupleIds()
  // console.log('paths: ', paths) [ { params: { id: '29122021' } }, ]
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
              <th className={styles.thead_internal}>Temp [deg]</th>
              <th className={styles.thead_internal}>Hum [%]</th>
              <th className={styles.thead_external}>Ext. temp [deg]</th>
              <th className={styles.thead_external}>Ext. hum [%]</th>
              <th className={styles.thead_external}>Pressure [hPa]</th>
            </tr>
          </thead>
          <tbody>
          {tupleData.map((tuple) => {
            // console.log('tuple: ', tuple)
            return(
              <tr key={tuple.to_char}>
                <td>{tuple.id_key}</td>
                <td>{tuple.to_char}</td>
                <td>{tuple.gpio}</td>
                <td className={styles.tcolumn_internal}>{tuple.temp}</td>
                <td className={styles.tcolumn_internal}>{tuple.hum}</td>
                <td className={styles.tcolumn_external}>{tuple.w_temp}</td>
                <td className={styles.tcolumn_external}>{tuple.w_hum}</td>
                <td className={styles.tcolumn_external}>{tuple.pressure}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </Layout>
    )
}
