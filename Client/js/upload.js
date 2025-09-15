async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    if (!file) {
      createToast('Please select a file first!', "warning");
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
  
    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText); 
          }
      const result = await response.text();
      const currentDate = new Date();
      const timestamp = currentDate.toISOString().replace(/[-:]/g, "").slice(0, 15); // לדוגמה: 20241106T123456
      const image_lali = `${file.name.split('.')[0]}_${timestamp}.${file.name.split('.').pop()}`;
    } catch (error) {
      console.error('Error uploading file:', error);
      createToast(`Error uploading file: ${error.message}`, "error");
    }
  }
  