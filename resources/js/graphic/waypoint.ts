import * as constants from '../../../src/core/constants'
import { NavaidType, Parameters, Waypoint } from '../../../src/core/entities'
// import { Coordinate, Level, Speed } from '../../../src/core/valueObjects'
import * as geomath from '../../../src/helpers/geomath'

export class WaypointGraphic extends createjs.Container {

    waypoint: Waypoint
    /*
    latitude: number = 0
    longitude: number = 0
    label: string = 'WP'
    visible: boolean = true
    labelVisible: boolean = false
    visibleTemp: boolean = false
    labelVisibleTemp: boolean = false
    isNavaid: boolean = false
    isFix: boolean = false
    isWaypoint: boolean = false
    isRunway: boolean = false
    isAts: boolean = false
    isNavaidVisible: boolean = false
    isFixVisible: boolean = false
    isWaypointVisible: boolean = false
    isRunwayVisible: boolean = false
    isAtsVisible: boolean = false
    useCounter: number = 0
    navaidType: NavaidType | undefined
    */


    // Graphic object
    gBox: createjs.Shape
    gLabel: createjs.Text

    constructor(waypoint: Waypoint) {
        super()
        this.waypoint = waypoint
        /*
        this.latitude = waypoint.latitude
        this.longitude = waypoint.longitude
        this.label = waypoint.label

        this.visible = waypoint.visible
        this.labelVisible = waypoint.labelVisible
        this.visibleTemp = waypoint.visibleTemp
        this.labelVisibleTemp = waypoint.labelVisibleTemp
        this.isNavaid = waypoint.isNavaid
        this.isFix = waypoint.isFix
        this.isWaypoint = waypoint.isWaypoint
        this.isRunway = waypoint.isRunway
        this.isAts = waypoint.isAts
        this.isNavaidVisible = waypoint.isNavaidVisible
        this.isFixVisible = waypoint.isFixVisible
        this.isWaypointVisible = waypoint.isWaypointVisible
        this.isRunwayVisible = waypoint.isRunwayVisible
        this.isAtsVisible = waypoint.isAtsVisible
        this.useCounter = waypoint.useCounter
        this.navaidType = waypoint.navaidType
        */
    
        this.gBox = new createjs.Shape()
        this.gBox.graphics.setStrokeStyle(1).beginStroke(constants.FIX_BODY_COLOR).moveTo(-4,4).lineTo(0,-4).lineTo(4,4).lineTo(-4,4).endStroke()
        this.gLabel = new createjs.Text("WP", "normal 10px Courier", constants.FIX_TEXT_COLOR)
        this.gLabel.x = (Math.random() * 30);
        this.gLabel.y = (Math.random() * -30);
        super.addChild(this.gBox, this.gLabel)
    }

    /*
    setPosition(parameters: Parameters) {
        var coords = geomath.coordsToScreen(this.latitude, this.longitude, parameters)
        this.x = coords.y
        this.y = coords.x
    }
    */

    display(parameters: Parameters ) {

        /*
        const scale = parameters.currentScale + 0.4 / 1.2;
        this.gBox.scaleX = scale; //  / 1.5;
        this.gBox.scaleY = scale; // / 1.5;
        this.gLabel.scaleX = scale;
        this.gLabel.scaleY = scale;
        */
    
        this.gBox.graphics.clear();
        this.gLabel.text = this.waypoint.label

        if (this.waypoint.isNavaid) {
            if (this.waypoint.navaidType == NavaidType.NAVAID_TYPE_NDB) {
                this.gBox.graphics.setStrokeStyle(1).beginStroke(constants.FIX_BODY_COLOR).moveTo(0,0).drawCircle(0, 0, 6).endStroke();
            }
            else if (this.waypoint.navaidType  == NavaidType.NAVAID_TYPE_VORDMENDB || this.waypoint.navaidType  == NavaidType.NAVAID_TYPE_VORDME) {
                // console.log(`${this.name}: ${this.latitude} / ${this.longitude}`)
                this.gBox.graphics.setStrokeStyle(1).beginStroke(constants.FIX_BODY_COLOR).moveTo(0,0).drawCircle(0, 0, 7).beginFill(constants.FIX_BODY_COLOR).moveTo(-4, 4).lineTo(0, -4).lineTo(4, 4).lineTo(-4, 4).endStroke();
            }
            else {
                this.gBox.graphics.setStrokeStyle(1).beginStroke(constants.FIX_BODY_COLOR).moveTo(0,0).beginFill(constants.FIX_BODY_COLOR).moveTo(-2, 2).lineTo(0, -2).lineTo(2, 2).lineTo(-2, 2).endStroke();
            }
        }
        else if (this.waypoint.isAts) {
            this.gBox.graphics.setStrokeStyle(1).beginStroke(constants.FIX_BODY_COLOR).moveTo(0,0).beginFill(constants.FIX_BODY_COLOR).moveTo(-4,4).lineTo(0,-4).lineTo(4,4).lineTo(-4,4).endStroke();
        }
        else if (this.waypoint.isFix) {
            var c = this.waypoint.useCounter;
            if (c<4) c = 4;
            if (c>4) c = 5;
            this.gBox.graphics.setStrokeStyle(1).beginStroke(constants.FIX_BODY_COLOR).moveTo(-c,c).lineTo(0,-c).lineTo(c,c).lineTo(-c,c).endStroke();
        }
        else {
            this.gBox.graphics.setStrokeStyle(1).beginStroke(constants.FIX_BODY_COLOR).moveTo(-3,3).lineTo(0,-3).lineTo(3,3).lineTo(-3,3).endStroke();
            // this.gLabel.scaleX = scale * 0.9;
            // this.gLabel.scaleY = scale * 0.9;
        }
        if (this.waypoint.labelVisibleTemp) {
            this.gLabel.color = "rgba(255,255,0,1)";
            // this.gLabel.scaleX = scale * 1.5;
            // this.gLabel.scaleY = scale * 1.5;
        }
        else {
            this.gLabel.color = constants.FIX_TEXT_COLOR;
        }

        var coords = geomath.coordsToScreen(this.waypoint.latitude, this.waypoint.longitude, parameters)
        this.x = coords.x
        this.y = coords.y
        // this.setPosition(parameters);
    }    
}

