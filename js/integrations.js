// Integration management functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle integration form submission
    const integrationForm = document.getElementById('integrationForm');
    if (integrationForm) {
        integrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const integrationData = {
                operator: formData.get('operator'),
                userId: formData.get('userId'),
                password: formData.get('password'),
                replaceWord: formData.get('replaceWord'),
                testMode: document.getElementById('testMode').checked,
                saveLog: document.getElementById('saveLog').checked
            };

            // Save integration settings
            saveIntegrationSettings(integrationData);
        });
    }
});

// Save integration settings
function saveIntegrationSettings(data) {
    // Here you would typically send this data to your backend
    console.log('Saving integration settings:', data);
    
    // Show success message
    alert('Entegrasyon ayarları başarıyla kaydedildi.');
}

// Load integration settings
function loadIntegrationSettings() {
    // Here you would typically fetch settings from your backend
    const mockSettings = {
        operator: 'istya',
        userId: '1889725077',
        password: '********',
        replaceWord: 'Test Kelime',
        testMode: false,
        saveLog: true
    };

    // Populate form with settings
    const form = document.getElementById('integrationForm');
    if (form) {
        form.querySelector('[name="operator"]').value = mockSettings.operator;
        form.querySelector('[name="userId"]').value = mockSettings.userId;
        form.querySelector('[name="password"]').value = mockSettings.password;
        form.querySelector('[name="replaceWord"]').value = mockSettings.replaceWord;
        document.getElementById('testMode').checked = mockSettings.testMode;
        document.getElementById('saveLog').checked = mockSettings.saveLog;
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadIntegrationSettings();
});