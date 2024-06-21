document.body.innerHTML = `
    <div class="error-container">
        <h1>404 Error</h1>
        <p>You weren't supposed to be here, buddy.</p>
        <p>This page will close in 10 seconds.</p>
    </div>
`;
const style = document.createElement('style');
style.textContent = `
    .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #000;
        color: #fff;
        font-family: 'Courier New', Courier, monospace;
        text-align: center;
    }
`;
document.head.appendChild(style);

setTimeout(() => {
    window.close();
}, 10000);
