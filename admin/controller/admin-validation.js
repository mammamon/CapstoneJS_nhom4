function validateProduct(name, title, image, price, speed, branch, type, color, paper, spec, option, description, duplicateName) {
    let isValid = true;
  
    // Check input trống
    if (!name || !title || !image || !price || !speed || !branch || !type || !color || !paper) {
      isValid = false;
      alert('Vui lòng nhập đầy đủ thông tin')
    }
  
    // Check name
    if (name && (!/^[a-zA-Z0-9- ]+$/.test(name) || name.length > 50)) {
      isValid = false;
      document.querySelector('#check-name').innerHTML = 'Name must only contain letters, numbers and hyphens and be less than 50 characters';
    }
      
    // Check title
    if (title && title.length > 200) {
      isValid = false;
      document.querySelector('#check-title').innerHTML = 'Title must be less than 200 characters';
    } else {
      document.querySelector('#check-title').innerHTML = '';
    }
  
    // Check image
    if (image && (!/^https?:\/\/\S+$/.test(image))) {
      isValid = false;
      document.querySelector('#check-image').innerHTML = 'Please enter a valid image URL';
    } else {
      document.querySelector('#check-image').innerHTML = '';
    }
  
    // Check price
    if (price && (isNaN(price) || price <= 0)) {
      isValid = false;
      document.querySelector('#check-price').innerHTML = 'Price must be a number greater than zero';
    } else {
      document.querySelector('#check-price').innerHTML = '';
    }
  
    // Check speed
    if (speed && (isNaN(speed) || speed <= 0)) {
      isValid = false;
      document.querySelector('#check-speed').innerHTML = 'Speed must be a number greater than zero';
    } else {
      document.querySelector('#check-speed').innerHTML = '';
    }
  
     // Check branch
     if (branch && (!/^[a-zA-Z ]+$/.test(branch) || branch.length > 30)) {
       isValid = false;
       document.querySelector('#check-branch').innerHTML =
         'Branch must only contain letters and spaces and be less than or equal to 30 characters';
     } else {
       document.querySelector('#check-branch').innerHTML =
         '';
     }
  
     // Check type
     if (type && (!/^[a-zA-Z ]+$/.test(type) || type.length > 30)) {
       isValid = false;
       document.querySelector('#check-type').innerHTML =
         'Type must only contain letters and spaces and be less than or equal to 30 characters';
     } else {
       document.querySelector('#check-type').innerHTML =
         '';
     }
  
     // Check color
     if (color && (!/^[a-zA-Z ]+$/.test(color) || color.length > 30)) {
       isValid = false;
       document.querySelector('#check-color').innerHTML =
         'Color must only contain letters and spaces and be less than or equal to 30 characters';
     } else {
       document.querySelector('#check-color').innerHTML =
         '';
     }
  
     // Check description
     if (description === '') {
       description = 'chưa có mô tả';
     }
  
     return isValid;
  }