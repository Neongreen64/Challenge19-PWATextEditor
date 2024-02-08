let defPrompt;
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Save the event for later when user wants to install the PWA
  event.preventDefault();
  defPrompt = event;
  butInstall.style.display = 'block';
  console.log('Install Prompt', defPrompt);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {

  if (defPrompt) {
    defPrompt.prompt();
    const result = await defPrompt.userChoice;
    defPrompt = null;
    if (result.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    defPrompt = null;
  }

  butInstall.style.display = 'none';
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App Installed :3', 'appinstalled', event);
  butInstall.style.display = 'none';
});
