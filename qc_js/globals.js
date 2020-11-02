function isValidDate(date) {
  return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
}

function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth()+1;
  var year = date.getFullYear();
  var hr = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  if(day<10){ day = '0'+day;}
  if(month<10){month = '0'+month;}
  if(hr<10){hr = '0'+hr;}
  if(min<10){min = '0'+min;}
  if(sec<10){sec = '0'+sec;}

  return  year + '.' + month + '.' + day + ' '+hr+':'+min+':'+sec  ;
}

