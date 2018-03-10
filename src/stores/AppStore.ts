import { action, observable, reaction, computed } from "mobx";
import { History } from "history";
import { ROUTE_FAVORITES, ROUTE_PLAYLISTS } from "../util/constants";
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

export interface IResponseCollection<P> {
  data: Array<P>;
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

export interface IPlaylist {
  id: number;
  title: string;
  nb_tracks: number;
  fans; number;
  picture_medium: string;
}

export interface IMyTab {
  index: number;
  title: string;
  routePath: string;
  count?: string;
}

export class AppState {
  constructor() {
    this.userArtistsFromApi = [];
    reaction(
      () => this.userId,
      user => {
        /**
         * Artists
         */
        DZ.api("user/me/artists?limit=1000", (artists: IResponseCollection<IArtist>) => {
          this.userArtistsFromApi = artists.data;
          this.userArtistsFromApi.forEach(artist => {
            if (artist.picture_medium.endsWith("000000-80-0-0.jpg")) {
              DZ.api(
                "artist/" + artist.id + "/comments",
                (comments: IResponseComment) => {
                  if (comments.total) {
                    comments.data.forEach(comment => {
                      if (comment.text.startsWith("{")) {
                        try {
                          const json = JSON.parse(comment.text);
                          artist.picture_medium = json["photo"];
                        } catch (e) {}
                      }
                    });
                  }
                }
              );
            }
          });
          //dthis.getdMoreUserArtists(artists.next);
        });

        /**
         * Playlists
         */
        DZ.api("user/me/playlists?limit=1000", (list: IResponseCollection<IPlaylist>) => {
          this.userPlaylistsFromApi = list.data;
        });
      }
    );
  }

/*
  getdMoreUserArtists = (urlParam: string) => {
    if (!urlParam) {
      return;
    }
    const p = urlParam.indexOf("user/me/");
    const url = urlParam.substr(p);
    DZ.api(url, (artists: IResponseCollection) => {
      this.userArtistsFromApi = artists.data;
      //this.getdMoreUserArtists(artists.next);
    });
    DZ.api(url, (playlists: IResponseCollection) => {
      this.userPlaylistsFromApi = playlists.data;
      //this.getdMoreUserArtists(artists.next);
    });
  };
*/

  @observable user: IUser;

  @observable userArtistsFromApi: Array<IArtist>;
  @computed
  get userArtists(): Array<IArtist> {
    if (!this.userArtistsFromApi) {
      return [];
    }
    return this.userArtistsFromApi
      .filter((artist: IArtist) => {
        if (!this.artistNameFilter) {
          return true;
        }
        return artist.name.toLowerCase().includes(this.artistNameFilter.toLowerCase());
      })
      .sort((a1, a2): number => {
      if (a1.nb_fan > a2.nb_fan) {
        return -1;
      }
      if (a1.nb_fan < a2.nb_fan) {
        return 1;
      }
      return 0;
    });
  }
  
  @observable userPlaylistsFromApi: Array<IPlaylist>;
  @computed
  get userPlaylists(): Array<IPlaylist> {
    if (!this.userPlaylistsFromApi) {
      return [];
    }
    return this.userPlaylistsFromApi
      .filter((playlist: IPlaylist) => {
        if (!this.artistNameFilter) {
          return true;
        }
        return playlist.title.toLowerCase().includes(this.artistNameFilter.toLowerCase());
      })
      .sort((a1, a2): number => {
        if (a1.fans > a2.fans) {
          return -1;
        }
        if (a1.fans < a2.fans) {
          return 1;
        }
        return 0;
      });
  }

  /*
    @computed get userPlaylists(): Array<IPlaylist> {

    }
  */

  @computed
  get userId(): string {
    if (!this.user) {
      return "";
    }
    return this.user.id;
  }

  @observable isPlayHover: boolean = false;
  @action
  setPlayHover(hover: boolean) {
    this.isPlayHover = hover;
    this.statusPlay = hover ? "Here we go!" : "";
  }
  @observable statusPlay: string;

  @action
  login() {
    DZ.login(
      response => {
        if (response.authResponse) {
          console.log("Welcome!  Fetching your information.... ");
          DZ.api("/user/me", (user: IUser) => {
            this.user = user;
            console.log("Good to see you, " + user.name + ".");
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { perms: "basic_access,email" }
    );
  }

  @observable APP_ID: string = "272642";

  @observable artistIdActive: number;

  @action
  setHistory(history: any) {
    this.history = history;
    this.setTabActiveIndex(0);
  }
  @action
  go(path: string) {
    this.history.push(path);
  }
  @action
  goArtistTracks(artistId: number) {
    this.history.push("/Me/Artist/" + artistId.toString() + "/Tracks");
  }
  @action goBack() {
    this.history.goBack();
  }
  private history: History;

  @action
    debugger ;goPlaylistTracks(playlistId: number) {
    //this.history.push("http://127.0.0.1:3000/Me/Playlist/1600104235/Tracks")
    debugger ;if (!playlistId) {
      return;
    }
    this.history.push("/Me/Playlist/" + playlistId.toString() + "/Tracks");
  }

  @action filterByArtistNsme(artistNameFilter: string) {
    this.artistNameFilter = artistNameFilter;
  }
  @observable artistNameFilter: string;
  /*
      getImageArtist = (artitstName: string): Promise<string> => {
        return getFirstImageURL(artitstName);
      }
  */

  private tabMyMusica = [
    ROUTE_FAVORITES,
    ROUTE_PLAYLISTS
  ];

  @observable myMusicActiveIndex: number;
  @action setMyMusicActiveIindex(index: number) {
    this.go(this.tabMyMusica[index]);
    this.myMusicActiveIndex = index;
  }

  @observable myMusicActiveTabValue: string;
  @action setMyMusicActiveTabValue(value: string) {
    this.myMusicActiveTabValue = value;
  }

  @computed get tabDataSet(): Array<IMyTab> {
    return [
      {
        index: 0,
        title: 'My Favorite Artists',
        routePath: ROUTE_FAVORITES
      },
      {
        index: 1,
        title: 'My PlayLists',
        routePath: ROUTE_PLAYLISTS
      },
      {
        index: 2,
        title: 'My Favorite Tracks',
        routePath: ROUTE_PLAYLISTS
      }
    ]
  }
  @observable tabActiveIndex: number;

  @computed get tabActiveRoutePath(): string {
    if (this.tabActiveIndex < 0) {
      return null;
    }
    return this.tabDataSet[this.tabActiveIndex].routePath;
  }
  @action setTabActiveIndex(index: number) {
    if (this.tabActiveIndex === index) {
      return;
    }
    this.tabActiveIndex = index;
    debugger ;this.history.push(this.tabActiveRoutePath);
  }
}