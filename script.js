// Add click functionality to help modules
document.addEventListener('DOMContentLoaded', function() {
  const helpModules = document.querySelectorAll('.help-module');
  
  helpModules.forEach(module => {
    module.addEventListener('click', function() {
      const moduleTitle = this.querySelector('h3').textContent;
      
      // Create a notification element
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = `You clicked on ${moduleTitle}. In a real application, this would navigate to the help page for this topic.`;
      
      // Style the notification
      notification.style.position = 'fixed';
      notification.style.bottom = '20px';
      notification.style.left = '50%';
      notification.style.transform = 'translateX(-50%)';
      notification.style.backgroundColor = 'var(--primary-purple)';
      notification.style.color = 'white';
      notification.style.padding = '15px 25px';
      notification.style.borderRadius = '5px';
      notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
      notification.style.zIndex = '1000';
      notification.style.maxWidth = '80%';
      notification.style.textAlign = 'center';
      
      // Add to body
      document.body.appendChild(notification);
      
      // Remove after 3 seconds
      setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 3000);
    });
  });
  
  // Add functionality to support search
  const supportSearchBtn = document.querySelector('.support-search .btn');
  const supportSearchInput = document.querySelector('.support-search input');
  
  supportSearchBtn.addEventListener('click', function() {
    const searchTerm = supportSearchInput.value.trim();
    if (searchTerm) {
      // Create a notification element
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = `Searching for: "${searchTerm}". In a real application, this would show search results.`;
      
      // Style the notification
      notification.style.position = 'fixed';
      notification.style.bottom = '20px';
      notification.style.left = '50%';
      notification.style.transform = 'translateX(-50%)';
      notification.style.backgroundColor = 'var(--primary-purple)';
      notification.style.color = 'white';
      notification.style.padding = '15px 25px';
      notification.style.borderRadius = '5px';
      notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
      notification.style.zIndex = '1000';
      notification.style.maxWidth = '80%';
      notification.style.textAlign = 'center';
      
      // Add to body
      document.body.appendChild(notification);
      
      // Remove after 3 seconds
      setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 3000);
    }
  });
  
  // Add functionality to contact support button
  const contactSupportBtn = document.querySelector('.btn-purple.btn-lg');
  
  contactSupportBtn.addEventListener('click', function() {
    // Create a notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `Contact Support clicked. In a real application, this would open a contact form or chat.`;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = 'var(--primary-purple)';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    notification.style.zIndex = '1000';
    notification.style.maxWidth = '80%';
    notification.style.textAlign = 'center';
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.5s';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 3000);
  });
});