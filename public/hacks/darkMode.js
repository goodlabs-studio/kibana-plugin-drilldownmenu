import chrome from 'ui/chrome';

//CSS variables 
const tooltip_background = '--tooltip-background';
const tooltip_color = '--tooltip-color';
const modal_background = '--modal-background';
const modal_color = '--modal-color';
const tooltip_link_color = '--tooltip-link-color';
const tooltip_link_hover_color = '--tooltip-link-hover-color';

const getDarkMode = async () => {
    
    const response = await fetch(chrome.addBasePath('/api/kibana/settings'), {
                        method: 'GET'
                    })
    
    const data = await response.json();
    const settings = data.settings;

    if('theme:darkMode' in settings){
        //Setting CSS variables based on if in dark mode or not
        document.documentElement.style.setProperty(tooltip_background, '#fff');
		document.documentElement.style.setProperty(tooltip_color, 'black');
		document.documentElement.style.setProperty(modal_background, '#fff');
		document.documentElement.style.setProperty(modal_color, 'black');
		document.documentElement.style.setProperty(tooltip_link_color, 'black');
        return;
    }

    //Setting CSS variables based on if in dark mode or not
    document.documentElement.style.setProperty(tooltip_background, 'black');
    document.documentElement.style.setProperty(tooltip_color, '#fff');
    document.documentElement.style.setProperty(modal_background, 'black');
    document.documentElement.style.setProperty(modal_color, '#fff');
    document.documentElement.style.setProperty(tooltip_link_color, '#fff');
}

getDarkMode();

