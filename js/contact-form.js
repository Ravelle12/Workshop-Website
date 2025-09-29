// Contact Form Handler with Image Upload
let enquiriesData = [];
let currentImageData = null;

// Load existing enquiries from localStorage on page load
window.addEventListener('DOMContentLoaded', function() {
    const savedEnquiries = localStorage.getItem('nutechEnquiries');
    if (savedEnquiries) {
        enquiriesData = JSON.parse(savedEnquiries);
        console.log(`Loaded ${enquiriesData.length} existing enquiries`);
    }
});

// Image Upload Handler - ONLY if element exists (on index.html contact form)
const regPlateUpload = document.getElementById('regPlateUpload');
if (regPlateUpload) {
    regPlateUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            document.getElementById('fileName').textContent = file.name;
            
            const reader = new FileReader();
            reader.onload = function(event) {
                currentImageData = event.target.result;
                
                const preview = document.getElementById('imagePreview');
                preview.innerHTML = `
                    <img src="${currentImageData}" alt="Registration Plate">
                    <button type="button" class="remove-image" onclick="removeImage()">×</button>
                `;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Remove image function
function removeImage() {
    currentImageData = null;
    const uploadEl = document.getElementById('regPlateUpload');
    const fileNameEl = document.getElementById('fileName');
    const previewEl = document.getElementById('imagePreview');
    
    if (uploadEl) uploadEl.value = '';
    if (fileNameEl) fileNameEl.textContent = '';
    if (previewEl) previewEl.innerHTML = '';
}

// Form Submit Handler - ONLY if contact form exists
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newEnquiry = {
            timestamp: new Date().toLocaleString('en-ZA', { 
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }),
            date: new Date().toLocaleDateString('en-ZA'),
            time: new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }),
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            phone: this.phone.value,
            email: this.email.value,
            vehicleMake: this.vehicleMake.value || 'Not specified',
            vehicleModel: this.vehicleModel.value || 'Not specified',
            serviceType: this.serviceType.options[this.serviceType.selectedIndex].text,
            message: this.message.value || 'No additional details',
            regPlateImage: currentImageData || 'No image uploaded',
            status: 'New',
            enquiryId: 'ENQ-' + Date.now()
        };

        enquiriesData.push(newEnquiry);
        localStorage.setItem('nutechEnquiries', JSON.stringify(enquiriesData));
        
        alert(`✅ Thank you ${newEnquiry.firstName}!\n\nYour enquiry has been received.\nEnquiry ID: ${newEnquiry.enquiryId}\n\nWe will contact you within 24 hours.`);
        
        this.reset();
        removeImage();
    });
}

// Export ALL enquiries to Excel (Admin function)
function exportAllEnquiriesToExcel() {
    if (typeof XLSX === 'undefined') {
        alert('Excel library not loaded. Please refresh the page.');
        return;
    }

    const wb = XLSX.utils.book_new();
    
    const groupedByDate = {};
    enquiriesData.forEach(enquiry => {
        const date = enquiry.date;
        if (!groupedByDate[date]) {
            groupedByDate[date] = [];
        }
        groupedByDate[date].push(enquiry);
    });

    const ws_data = [
        ['ENQUIRY ID', 'DATE', 'TIME', 'FIRST NAME', 'LAST NAME', 'PHONE', 'EMAIL', 'VEHICLE MAKE', 'VEHICLE MODEL', 'SERVICE TYPE', 'MESSAGE', 'REG PLATE IMAGE', 'STATUS']
    ];
    
    const dates = Object.keys(groupedByDate).sort((a, b) => new Date(b) - new Date(a));
    
    dates.forEach((date, index) => {
        if (index > 0) {
            ws_data.push([]);
        }
        ws_data.push([`━━━━━ ${date} ━━━━━`, '', '', '', '', '', '', '', '', '', '', '', '']);
        
        groupedByDate[date].forEach(enquiry => {
            ws_data.push([
                enquiry.enquiryId,
                enquiry.date,
                enquiry.time,
                enquiry.firstName,
                enquiry.lastName,
                enquiry.phone,
                enquiry.email,
                enquiry.vehicleMake,
                enquiry.vehicleModel,
                enquiry.serviceType,
                enquiry.message,
                enquiry.regPlateImage !== 'No image uploaded' ? 'IMAGE UPLOADED ✓' : 'No image',
                enquiry.status
            ]);
        });
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    
    ws['!cols'] = [
        { wch: 16 }, { wch: 12 }, { wch: 10 }, { wch: 15 }, { wch: 15 }, { wch: 15 },
        { wch: 30 }, { wch: 15 }, { wch: 18 }, { wch: 20 }, { wch: 45 }, { wch: 18 }, { wch: 12 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'All Enquiries');
    
    if (enquiriesData.some(e => e.regPlateImage !== 'No image uploaded')) {
        createImageSheet(wb);
    }
    
    const today = new Date().toISOString().split('T')[0];
    const fileName = `NuTech_Master_Enquiries_${today}.xlsx`;
    
    XLSX.writeFile(wb, fileName);
    console.log(`✅ Exported ${enquiriesData.length} enquiries to ${fileName}`);
}

function createImageSheet(wb) {
    const imageData = [
        ['ENQUIRY ID', 'CUSTOMER NAME', 'VEHICLE', 'REGISTRATION PLATE IMAGE LINK']
    ];
    
    enquiriesData.forEach(enquiry => {
        if (enquiry.regPlateImage !== 'No image uploaded') {
            imageData.push([
                enquiry.enquiryId,
                `${enquiry.firstName} ${enquiry.lastName}`,
                `${enquiry.vehicleMake} ${enquiry.vehicleModel}`,
                enquiry.regPlateImage.substring(0, 50) + '...'
            ]);
        }
    });
    
    const imgWs = XLSX.utils.aoa_to_sheet(imageData);
    imgWs['!cols'] = [{ wch: 16 }, { wch: 25 }, { wch: 25 }, { wch: 60 }];
    
    XLSX.utils.book_append_sheet(wb, imgWs, 'Registration Images');
}

// Admin Functions
function downloadMasterEnquiries() {
    if (enquiriesData.length === 0) {
        alert('No enquiries to export yet.');
        return;
    }
    exportAllEnquiriesToExcel();
    alert(`Downloaded master file with ${enquiriesData.length} enquiries.`);
}

function clearAllEnquiries() {
    if (confirm('⚠️ WARNING: This will delete ALL enquiries. Are you sure?')) {
        enquiriesData = [];
        localStorage.removeItem('nutechEnquiries');
        alert('All enquiries cleared.');
        if (typeof location !== 'undefined') {
            location.reload();
        }
    }
}

function updateEnquiryStatus(enquiryId, newStatus) {
    const enquiry = enquiriesData.find(e => e.enquiryId === enquiryId);
    if (enquiry) {
        enquiry.status = newStatus;
        localStorage.setItem('nutechEnquiries', JSON.stringify(enquiriesData));
        console.log(`Updated ${enquiryId} status to: ${newStatus}`);
    }
}

function viewRegPlateImage(enquiryId) {
    const enquiry = enquiriesData.find(e => e.enquiryId === enquiryId);
    if (enquiry && enquiry.regPlateImage !== 'No image uploaded') {
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <html>
            <head>
                <title>Registration Plate - ${enquiryId}</title>
                <style>
                    body { 
                        margin: 0; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        min-height: 100vh; 
                        background: #1a1a1a;
                        font-family: Arial, sans-serif;
                    }
                    .container {
                        text-align: center;
                        padding: 20px;
                    }
                    h2 { color: white; margin-bottom: 20px; }
                    img { 
                        max-width: 90vw; 
                        max-height: 80vh; 
                        border: 3px solid #C8102E;
                        border-radius: 8px;
                    }
                    .info {
                        color: #ccc;
                        margin-top: 15px;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Registration Plate Image</h2>
                    <img src="${enquiry.regPlateImage}" alt="Registration Plate">
                    <div class="info">
                        <p><strong>Enquiry ID:</strong> ${enquiry.enquiryId}</p>
                        <p><strong>Customer:</strong> ${enquiry.firstName} ${enquiry.lastName}</p>
                        <p><strong>Vehicle:</strong> ${enquiry.vehicleMake} ${enquiry.vehicleModel}</p>
                    </div>
                </div>
            </body>
            </html>
        `);
    } else {
        alert('No registration plate image available for this enquiry.');
    }
}