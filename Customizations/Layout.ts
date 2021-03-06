import {LayerDefinition} from "./LayerDefinition";
import {UIElement} from "../UI/UIElement";
import Translations from "../UI/i18n/Translations";
import Combine from "../UI/Base/Combine";
import State from "../State";
import Translation from "../UI/i18n/Translation";

/**
 * A layout is a collection of settings of the global view (thus: welcome text, title, selection of layers).
 */
export class Layout {

    public id: string;
    public icon: string = "./assets/logo.svg";
    public title: UIElement;
    public maintainer: string;
    public version: string;
    public description: string | UIElement;
    public changesetMessage: string;
    public socialImage: string = "";
    /**
     * Custom CSS link
     */
    public customCss: string = undefined;
    
    public layers: (LayerDefinition | string)[];
    public welcomeMessage: UIElement;
    public gettingStartedPlzLogin: UIElement;
    public welcomeBackMessage: UIElement;
    public welcomeTail: UIElement;

    public supportedLanguages: string[];
    
    public startzoom: number;
    public startLon: number;
    public startLat: number;

    public enableAdd: boolean = true;
    public enableUserBadge: boolean = true;
    public enableSearch: boolean = true;
    public enableLayers: boolean = true;
    public enableBackgroundLayers: boolean = true;
    public enableMoreQuests: boolean = true;
    public enableShareScreen: boolean = true;
    public enableGeolocation: boolean = true;
    public hideFromOverview: boolean = false;

    /**
     * The BBOX of the currently visible map are widened by this factor, in order to make some panning possible.
     * This number influences this
     */
    public widenFactor: number = 0.07;
    public defaultBackground: string = "osm";

    constructor(
        id: string,
        supportedLanguages: string[],
        title: Translation | string,
        layers: (LayerDefinition | string)[],
        startzoom: number,
        startLat: number,
        startLon: number,
        welcomeMessage: UIElement | string,
        gettingStartedPlzLogin: UIElement | string = new Combine([
            Translations.t.general.getStartedLogin
                .SetClass("soft")
                .onClick(() => {State.state.osmConnection.AttemptLogin()}),
            Translations.t.general.getStartedNewAccount
        ]),
        welcomeBackMessage: UIElement | string = Translations.t.general.welcomeBack,
        welcomeTail: UIElement | string = "",
    ) {
        this.supportedLanguages = supportedLanguages;
        this.title = Translations.WT(title)
        this.startLon = startLon;
        this.startLat = startLat;
        this.startzoom = startzoom;
        this.id = id;
        this.layers = layers;
        this.welcomeMessage = Translations.W(welcomeMessage)
        this.gettingStartedPlzLogin = Translations.W(gettingStartedPlzLogin);
        this.welcomeBackMessage = Translations.W(welcomeBackMessage);
        this.welcomeTail = Translations.W(welcomeTail);
    }
}

