const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Save the event for later when user wants to install the PWA
  event.preventDefault();
  deferredPrompt = event;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  const result = await promptEvent.userChoice;

  if (result.outcome === 'accepted') {
    console.log('Initializing the installation');
  } else {
    console.log('User cancelled the installation');
  }

  deferredPrompt = null;
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App Installed :3', 'appinstalled', event);
  butInstall.style.display = 'none';
});
