import {action, observable, reaction, computed} from "mobx";
//const {getFirstImageURL} = require("../../node_modules/first-image-search-load");

export declare namespace DZ {
    function login(callback: Function, perms: any): void;
    function logout(): void;
    function getLoginStatus(callback: Function): void;
    function api(user: string, callback: Function): void;
    let numberOfGreetings: number;
}

export interface IResponseComment {
  data: Array<IComment>;
  total: number;
}

export interface IComment {
    id: string;
    text: string;
}

export interface IUser {
    name: string;
    id: string;
}

export interface IResponseArtists {
    data: Array<IArtist>;
    next: string;
}

export interface IArtist {
    id: number;
    name: string;
    link: string;
    picture: string;
    picture_small: string;
    picture_medium: string;
    picture_big: string;
    picture_xl: string;
    nb_album: number;
    nb_fan: number;
    radio: boolean;
    time_add: string;
}

export class AppState {
    constructor() {
      this.userArtistsFromApi = [];
        reaction(() => this.userId, (user) => {
            DZ.api('user/me/artists?limit=1000', ((artists: IResponseArtists) => {
                this.userArtistsFromApi = artists.data;
                this.userArtistsFromApi.forEach(artist => {
                    if (artist.picture_medium.endsWith('000000-80-0-0.jpg')) {
                        DZ.api("artist/" + artist.id + "/comments", (comments: IResponseComment) => {
                            if (comments.total) {
                                comments.data.forEach(comment => {
                                  if (comment.text.startsWith('{')) {
                                    debugger ;const json = JSON.parse(comment.text);
                                    artist.picture_medium = json["photo"];
                                  }
                                })
                            }
                        })
                    }
                })
                //dthis.getdMoreUserArtits(artists.next);
            }))
        })
    }

    getdMoreUserArtits = (urlParam: string) => {
        if (!urlParam) {
            return;
        }
        const p = urlParam.indexOf('user/me/');
        const url = urlParam.substr(p);
      DZ.api(url, ((artists: IResponseArtists) => {
        this.userArtistsFromApi = artists.data;
        this.getdMoreUserArtits(artists.next)
      }))
    };

    @observable user: IUser;

    @observable userArtistsFromApi: Array<IArtist>;
    @computed get userArtists(): Array<IArtist> {
        if (!this.userArtistsFromApi) {
            return [];
        }
        return this.userArtistsFromApi.sort((a1, a2): number => {
          if (a1.nb_fan > a2.nb_fan) {
            return -1;
          }
          if (a1.nb_fan < a2.nb_fan) {
            return 1;
          }
          return 0;
        });
    }

    @computed get userId(): string {
        if (!this.user) {
            return '';
        }
        return this.user.id;
    }

    @observable isPlayHover: boolean = false;
    @action setPlayHover(hover: boolean) {
        this.isPlayHover = hover;
        this.statusPlay = hover ? "Here we go!" : "";
    }
    @observable statusPlay: string;

    @action login() {
        DZ.login((response) => {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                DZ.api('/user/me', (user: IUser) => {
                    this.user = user;
                    console.log('Good to see you, ' + user.name + '.');
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {perms: 'basic_access,email'});
    }

/*
    getImageArtist = (artitstName: string): Promise<string> => {
      return getFirstImageURL(artitstName);
    }
*/
}