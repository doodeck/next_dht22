// params.js

export default function handler(req, res) {
    console.log(JSON.stringify(req.headers))

    let date_ob = new Date();

    // current day
    // adjust 0 before single digit date
    let day = ("0" + date_ob.getDate()).slice(-2);
    
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    
    // current year
    let year = date_ob.getFullYear();
    
    // current hours
    let hours = date_ob.getHours();
    
    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    let yyyymmddhhmms = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    console.log(yyyymmddhhmms);
    
    // prints time in HH:MM format
    console.log(hours + ":" + minutes);
    
    res.status(200).json({ status: 'OK', time: yyyymmddhhmms })
}
  