// const contextMenu = require('electron-context-menu');
// contextMenu({
//     prepend: (defaultActions, params, browserWindow) => [
//         {
//             label: 'AddChart',
//             visible: true,
//             click: () => {
//                 CreateCanvas();
//             }
//         },
//         {
//             label: 'New tab',
//             visible: true,

//         }
//     ]
// });

const Menu = require('electron').Menu;
const markdownContextMenu = Menu.buildFromTemplate([
    {
        label: 'Opesdfasd fsavfvavn Chart', click() {
            console.log('fromm sdaidbiasbdiasbdiasbidbaisdbiasbdiab');
        }
    },
    { type: 'separator' },
]);


window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    markdownContextMenu.popup();
});