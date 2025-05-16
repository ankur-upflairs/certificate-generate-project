exports.formatData= function (data,textCase='capitalize'){
    // Validate and format the data
      function capitalizeWords(str) {
        return str.replace(/\w\S*/g, (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }
      let formattedData;
      if ((textCase == "capitalize")) {
        formattedData = data.map((row) => {
          return {
            Name: row.Name ? capitalizeWords(row.Name) : "",
            enrollmentNo: row.enrollmentNo || "",
          };
        });
      }
      else if(textCase == "uppercase"){
        formattedData = data.map((row) => {
          return {
            Name: row?.Name?.toUpperCase() || "",
            enrollmentNo: row.enrollmentNo || "",
          };
        });
      }
      else if(textCase == "lowercase"){
        formattedData = data.map((row) => {
          return {
            Name: row?.Name?.toLowerCase() || "",
            enrollmentNo: row.enrollmentNo || "",
          };
        });
      }
      else if(textCase== 'None'){
        formattedData = data.map((row) => {
          return {
            Name: row?.Name || "",
            enrollmentNo: row.enrollmentNo || "",
          };
        });
      }
      return formattedData
}