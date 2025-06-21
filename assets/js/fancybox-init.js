// Initialize Fancybox
document.addEventListener("DOMContentLoaded",()=>{
  if(typeof Fancybox!=="undefined"){
    Fancybox.bind("[data-fancybox]",{
      compact: true,
      contentClick: "toggleZoom",
      backdropClick: "close",
      Toolbar: {
        display: ["zoom", "slideshow", "fullscreen", "close"]
      },
      Thumbs: {
        type: "classic"
      }
    });
  }
}); 