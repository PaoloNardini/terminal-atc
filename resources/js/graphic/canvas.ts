/// <reference path="../../../node_modules/@types/easeljs/index.d.ts" />
import * as constants from '../../../src/core/constants'
import { Parameters } from '../../../src/core/entities'
import { PlaneGraphic } from './plane'
import { RunwayGraphic } from './runway'
// import * as math from '../math/math'

export class Main {

    mainStage: createjs.Stage
    mainContainer: createjs.Container
    parameters: Parameters

    constructor() {
        void constants
        this.mainStage  = new createjs.Stage("mainCanvas");
        // const arrStage     = new createjs.Stage("arrStripsCanvas");
        // const depStage     = new createjs.Stage("depStripsCanvas");
        // const consoleStage = new createjs.Stage("consoleCanvas");

        // Main container
        this.mainContainer = new createjs.Container();
        // mainContainer.id = 'mainContainer';

        this.parameters = new Parameters

        // console.log(this.parameters.maxArrivals)

    }

    tickFunction = (event: any) => {
        void event
        // console.log('tick')
        this.mainStage.update()
    }
    
    init = () => {

        this.parameters.latitudeCenter = 41.7
        this.parameters.longitudeCenter = 12.2
        this.mainStage.addChild(this.mainContainer);
        const planeGr = new PlaneGraphic()
        planeGr.latitude = 41.6
        planeGr.longitude = 12.1
        planeGr.setPosition(this.parameters)
        // planeGr.x = 100
        // planeGr.y = 100
        this.mainContainer.addChild(planeGr)

        const runwayGr = new RunwayGraphic()
        // R,16L,161,12802,197,1,108.100,161,41.845969,12.261494,14,3.00,56,1,0
        // R,34R,341,12802,197,1,111.550,341,41.812444,12.275525,6,3.00,57,1,0


        runwayGr.latitude = 41.845969
        runwayGr.longitude = 12.261494
        runwayGr.latitude_end = 41.812444
        runwayGr.longitude_end = 12.275525
        runwayGr.strip_length = 12802
        runwayGr.strip_width = 197
        runwayGr.heading = 161
        // console.log(`runway heading = ${runwayGr.heading}`)
        this.mainContainer.addChild(runwayGr)
        // runwayGr.plotRunway(this.parameters)
        runwayGr.display(this.parameters)
    
        createjs.Ticker.on("tick", this.tickFunction);
        createjs.Ticker.framerate = 1;
    }
}
