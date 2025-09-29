// Browser Notifications for Admin
function requestNotificationPermission() {
    if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notifications enabled");
            }
        });
    }
}

function sendNotification(title, message) {
    if (Notification.permission === "granted") {
        new Notification(title, {
            body: message,
            icon: '/images/logo.png',
            badge: '/images/badge.png'
        });
    }
}

// Example usage:
function notifyPartArrived(partDesc, jobNumber) {
    sendNotification(
        '📦 Part Arrived!',
        `${partDesc} for Job ${jobNumber} has been received`
    );
}

function notifyJobCompleted(jobNumber, vehicle) {
    sendNotification(
        '✅ Job Completed!',
        `Job ${jobNumber} (${vehicle}) is ready for collection`
    );
}

// Request permission on dashboard load
window.addEventListener('DOMContentLoaded', requestNotificationPermission);