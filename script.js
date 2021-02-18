const installBtn = document.getElementById('installBtn');
installBtn.style.display = 'none';

/* Put code here */
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('👍', 'beforeinstallprompt', event);
  window.deferredPrompt = event;
  // Remove the 'hidden' class from the install button container
  installBtn.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
  console.log('👍', 'butInstall-clicked');
  installBtn.style.display = 'none';
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  promptEvent.prompt();
  const result = await promptEvent.userChoice;
  console.log('👍', 'userChoice', result);
  window.deferredPrompt = null;
  divInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
  window.deferredPrompt = null;
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
