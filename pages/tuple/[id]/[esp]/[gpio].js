// [gpio].js

import { getFilteredTupleIds, getFilteredTupleData } from '../../../../lib/tuple'
const { config } = require('../../../../lib/config')
import Layout from '../../../../components/layout'
import styles from '../../../../styles/Tuple.module.css'
import Link from 'next/link'

/*
https://www.postgresqltutorial.com/postgresql-concat-function/
https://github.com/vercel/next.js/blob/canary/examples/dynamic-routing/pages/post/%5Bid%5D/%5Bcomment%5D.js
*/

// import { getIsFilterNone } from '../../../../lib/tuple'
/* attmpting to import any third function from the tuple module is causing an error:
error - ./node_modules/pg-connection-string/index.js:4:0
Module not found: Can't resolve 'fs'
*/
function getIsFilterNone(val) {
    const filterNone = config.filter.none

    return val === filterNone
}

function getRelUrl(params) {
    return `${params.id}/${params.esp}/${params.gpio}`
}

export async function getStaticPaths() {
    const paths = await getFilteredTupleIds()
    // console.log('paths: ', paths)
    return {
      paths,
      fallback: false
    }
            /* String variant:
            '/tuple/29122021/1/22',
            '/tuple/-/-1/-1',
            // Object variant:
            { params: { id: '29122021', esp: '1', gpio: '23' } }
            */
}

export async function getStaticProps({ params }) {
    console.log('getStaticProps/params: ', params)
    const tupleData = await getFilteredTupleData(params)
    // console.log('getStaticProps/tupleData[', params, ']', tupleData)
    return {
        props: {
            params,
            tupleData
        // {id_key: 2, to_char: "12-30-2021 00:00:14", gpio: 22, temp: 16.7, hum: 36.1, w_temp: 0.59, w_hum: 98,…}
        // ...
        }
    }
}

export default function FilteredTuple({ params, tupleData }) {
    console.log('FilteredTuple/params: ', params)
    const dateAll = getIsFilterNone(params.id)
    const espAll = getIsFilterNone(params.esp)
    const gpioAll = getIsFilterNone(params.gpio)

    // getRelUrl
    // console.log('tupleData2: ', tupleData)
    return (
      <Layout>
        <table>
          <thead>
            <tr key="header">
              <th>
                  {(!espAll && (
                    <Link href={`../../${params.id}/${config.filter.none}/${params.gpio}`}>
                    <a>esp32</a>
                    </Link>
                  )) || (espAll && <div>esp32</div>)}
              </th>
              <th>
                  {(!dateAll && (
                    <Link href={`../../${config.filter.none}/${params.esp}/${params.gpio}`}>
                    <a>Timestamp</a>
                    </Link>
                  )) || (dateAll && <div>Timestamp</div>)}
              </th>
              <th>
                  {(!gpioAll && (
                    <Link href={`../../${params.id}/${params.esp}/${config.filter.none}`}>
                    <a>gpio</a>
                    </Link>
                  )) || (gpioAll && <div>gpio</div>)}
              </th>
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
                <td>
                {(espAll && (
                    <Link href={`../../${params.id}/${tuple.id_key}/${params.gpio}`}>
                    <a>{tuple.id_key}</a>
                    </Link>
                  )) || (!espAll && <div>{tuple.id_key}</div>)}
                </td>
                <td>
                {(dateAll && (
                    <Link href={`../../${tuple.dd}/${params.esp}/${params.gpio}`}>
                    <a>{tuple.to_char}</a>
                    </Link>
                  )) || (!dateAll && <div>{tuple.to_char}</div>)}
                </td>
                <td>
                {(gpioAll && (
                    <Link href={`../../${params.id}/${params.esp}/${tuple.gpio}`}>
                    <a>{tuple.gpio}</a>
                    </Link>
                  )) || (!gpioAll && <div>{tuple.gpio}</div>)}
                </td>
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
