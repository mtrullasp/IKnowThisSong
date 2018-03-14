import { action, observable, reaction, computed } from "mobx";
import { History } from "history";
import {
  MTRULLASP_USER_ID,
  ROUTE_INTERPRETERS,
  ROUTE_PLAYLISTS
} from "../util/constants";
import composers from "../data/composers";
import composersPhoto from "../data/composersPhoto";

declare let window: any;

//const {getFirstImageURL} = require("../../node_modules/first-image-search-load");

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

export class TArtist {
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
  isComposer: boolean;
}

export interface IPlaylist {
  id: number;
  title: string;
  nb_tracks: number;
  fans;
  number;
  picture_medium: string;
}

export class TMyTab {
  id: string;
  index: number;
  title: string;
  routePath: string;
  count?: number;
  onEnter?: () => void;
}

export class AppState {
  constructor() {
    this.userArtistsFromApi = [];
    const DZ = window.DZ;
    reaction(
      () => this.userId,
      user => {
        /**
         * Artists
         */
        DZ.api(
          "user/me/artists?limit=1000",
          (artists: IResponseCollection<TArtist>) => {
            this.userArtistsFromApi = artists.data;
            /*this.userArtistsFromApi.forEach(artist => {
              if (artist.picture_medium.endsWith("000000-80-0-0.jpg")) {
                const nomsencer = artist.name.split(" ");
                const cognom =
                  nomsencer.length > 1
                    ? nomsencer[nomsencer.length - 1].trim().toLowerCase()
                    : nomsencer[0].trim().toLowerCase();
                /!*
                artist.picture_medium =
                  "https://www.biografiasyvidas.com/biografia/" +
                  cognom.charAt(0) +
                  "/fotos/" +
                  cognom +
                  ".jpg";
*!/
                /!*
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
*!/
              }
            });*/
            //dthis.getdMoreUserArtists(artists.next);
          }
        );

        /**
         * Playlists
         */
        DZ.api(
          "user/me/playlists?limit=10000",
          (list: IResponseCollection<IPlaylist>) => {
            this.userPlaylistsFromApi = list.data;
            this.tabDataSet.find(tab => tab.id === "playlists").count =
              list.data.length;
          }
        );
      }
    );

    reaction(
      () => this.userArtistsFromApi,
      artists => {
        this.tabDataSet.find(
          tab => tab.id === "composers"
        ).count = this.composersCount(artists);
        this.tabDataSet.find(
          tab => tab.id === "interpreters"
        ).count = this.interpretersCount(artists);
      }
    );

    reaction(
      () => this.composers.length,
      () => {
        this.tabDataSet.find(
          tab => tab.id === "composers"
        ).count = this.composersCount(this.userArtistsFromApi);
      }
    );

    /**
     * Events
     */
/*
    DZ.Event.subscribe("player_play", function(evt_name) {
      alert("playing");

      console.log("Player is playing");
    });
*/
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

  private isComposer = (artistId: number): boolean => {
    return this.composers.includes(artistId);
  };

  @observable userArtistsFromApi: Array<TArtist>;
  @computed get userArtistsFromApiResolt(): Array<TArtist> {
    return this.userArtistsFromApi.map(artist => {
      return {...artist, isComposer: this.isComposer(artist.id)}
    })
  }

  @computed
  get userArtists(): Array<TArtist> {
    if (!this.userArtistsFromApiResolt) {
      return [];
    }
    return this.userArtistsFromApiResolt
      .filter((artist: TArtist) => {
        if (this.showOnlyComposers) {
          if (!this.isComposer(artist.id)) {
            return false;
          }
        } else if (this.isComposer(artist.id)) {
          return false;
        }
        return artist;
      })
      .filter((artist: TArtist) => {
        if (!this.artistNameFilter) {
          return true;
        }
        return artist.name
          .toLowerCase()
          .includes(this.artistNameFilter.toLowerCase());
      })
      .sort((a1, a2): number => {
        if (a1.nb_fan > a2.nb_fan) {
          return -1;
        }
        if (a1.nb_fan < a2.nb_fan) {
          return 1;
        }
        return 0;
      })
      .map(artist => {
        return {
          ...artist,
          picture_medium: this.getArtistPhoto(artist, artist.picture_medium)
        } as TArtist;
      });
  }

  private composersPhotos = composersPhoto;
  private getArtistPhoto(artist: TArtist, defaultPhoto: string): string {

    const myPhoto = this.composersPhotos.find(photo => photo.id === artist.id);
    if (!artist.isComposer) {
      return defaultPhoto;
    }
    return !!myPhoto ? myPhoto.foto : defaultPhoto;
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
        return playlist.title
          .toLowerCase()
          .includes(this.artistNameFilter.toLowerCase());
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

  private interpretersCount(artists: Array<TArtist>): number {
    if (!artists) {
      return null;
    }
    return artists.filter(artist => {
      return !this.composers.includes(artist.id);
    }).length;
  }

  private composersCount(artists: Array<TArtist>): number {

    if (!artists) {
      return null;
    }
    return artists.filter(artist => {
      return this.composers.includes(artist.id);
    }).length;
  }

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
    const DZ = window.DZ;
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
  @action
  goBack() {
    this.history.goBack();
  }
  private history: History;

  @action
  goPlaylistTracks(playlistId: number) {
    //this.history.push("http://127.0.0.1:3000/Me/Playlist/1600104235/Tracks")
    const DZ = window.DZ;
    if (!playlistId) {
      return;
    }
    DZ.player.playPlaylist(playlistId, true);
    //this.history.push("/Me/Playlist/" + playlistId.toString() + "/Tracks");
  }

  @action
  filterByArtistNsme(artistNameFilter: string) {
    this.artistNameFilter = artistNameFilter;
  }
  @observable artistNameFilter: string;
  /*
      getImageArtist = (artitstName: string): Promise<string> => {
        return getFirstImageURL(artitstName);
      }
  */

  private tabMyMusica = [ROUTE_INTERPRETERS, ROUTE_PLAYLISTS];

  @observable myMusicActiveIndex: number;
  @action
  setMyMusicActiveIindex(index: number) {
    this.go(this.tabMyMusica[index]);
    this.myMusicActiveIndex = index;
  }

  @observable myMusicActiveTabValue: string;
  @action
  setMyMusicActiveTabValue(value: string) {
    this.myMusicActiveTabValue = value;
  }

  @observable
  tabDataSet: Array<TMyTab> = [
    {
      id: "composers",
      index: 0,
      title: "My Composers",
      routePath: ROUTE_INTERPRETERS,
      count: null,
      onEnter: () => {
        this.showOnlyComposers = true;
      }
    },
    {
      id: "interpreters",
      index: 1,
      title: "My Interpreters",
      routePath: ROUTE_INTERPRETERS,
      count: null,
      onEnter: () => {
        this.showOnlyComposers = false;
      }
    },
    {
      id: "playlists",
      count: null,
      index: 2,
      title: "My PlayLists",
      routePath: ROUTE_PLAYLISTS
    },
    {
      id: "tracks",
      index: 3,
      count: null,
      title: "My Tracks",
      routePath: ROUTE_PLAYLISTS
    },
    {
      id: "search",
      index: 4,
      title: "Search",
      routePath: ROUTE_PLAYLISTS
    },
    {
      id: "progress",
      index: 5,
      title: "My Progress",
      routePath: ROUTE_PLAYLISTS
    }
  ];

  @observable tabActiveIndex: number;

  @computed
  get tabActiveRoutePath(): string {
    if (this.tabActiveIndex < 0) {
      return null;
    }
    return this.tabDataSet[this.tabActiveIndex].routePath;
  }
  @computed
  get tabActiveId(): string {
    if (this.tabActiveIndex < 0) {
      return null;
    }
    return this.tabDataSet[this.tabActiveIndex].id;
  }
  @action
  setTabActiveIndex(index: number) {
    if (this.tabActiveIndex === index) {
      return;
    }
    this.tabActiveIndex = index;

    this.history.push(this.tabActiveRoutePath);
  }

  @observable showOnlyComposers: boolean = true;

  @observable composers: Array<number> = composers;
  @action
  toggleComposer(artistId: number) {
    if (this.composers.includes(artistId)) {
      this.composers.splice(this.composers.indexOf(artistId), 1);
    } else {
      this.composers.push(artistId);

    }
  }

  @computed
  get filterByKindArtist(): string {
    if (this.tabActiveId === "composers") {
      return "Filter by Composer";
    } else if (this.tabActiveId === "artists") {
      return "Filter by Artist";
    }
  }

  @observable fotos: string;

  @action
  setFotos() {
    this.fotos = JSON.stringify(
      this.userArtistsFromApi.map(artist => {
        return { id: artist.id, foto: artist.picture_medium };
      })
    );
  }
}
