# kibana-plugin-drilldownmenu
> Drill down menu implementation for Kibana

## Installation:

- Clone this repository
- Rename cloned folder to `kibana-plugin-drilldownmenu`
- Create a folder named `kibana`
- Copy repository into newly created folder `kibana`
```.
├── kibana
│   ├── kibana-plugin-drilldownmenu
│   │   ├── [repository-content]
│   │   ├── .
│   │   ├── .
│   │   ├── .
```
- Compress `kibana` into `kibana.zip`
- Install plugin into kibana
```
./kibana-plugin install file://[PATH-TO-ZIP]
```

## Usage:

- Change field format under kibana's Index Patterns to **Drill Down**
![Change field format type](img/step-1.png)
- Configure URL's and labels that should be present in the menu
![URL addition example](img/step-3.png)
- Hovering over values of the formatted field now provides a menu of URL's
![URL menu example](img/step-4.png)



