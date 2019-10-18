import * as request from 'superagent';
import { Brewery } from '../../../interfaces/brewery';

export class BreweryService {

    /**Get all by city name */
    public getByCity(city: string) {
        return new Promise((resolve, reject) => {
            if (city) {
                // let index = 1;
                let indexArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                const REQUEST_PROMISE = (breweryData?: Brewery[]) => {
                    console.log(breweryData);
                    const BREWERY_PROMISES: Promise<Brewery[]>[] = indexArray.map(index => {
                        return new Promise((resolve, reject) => {
                            request
                                .get(`https://api.openbrewerydb.org/breweries?by_city=${city}&page=${index += 10}`)
                                .timeout(1000 * 6)
                                .end((err, res) => {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        if (res && res.body && res.body.length > 0) {
                                            resolve(res.body);
                                        } else {
                                            resolve();
                                        }
                                    }
                                })
                        })
                    })
                    Promise.all(BREWERY_PROMISES)
                        .then((data: Brewery[][]) => {
                            const empty = data.findIndex(breweryData => {
                                return !(breweryData.length > 0)
                            });
                            if (empty !== -1) {
                                let flattenArray: Brewery[] = [];
                                if (breweryData) {
                                    flattenArray.push(...breweryData);
                                }
                                data.forEach(element => {
                                    flattenArray.push(...element);
                                })
                                resolve(flattenArray)
                            } else if (breweryData) {
                                REQUEST_PROMISE(breweryData)
                            }
                        })
                }
                REQUEST_PROMISE();
            } else {
                reject('No city provided');
            }
        });
    }

    /**Get all by state name */
    public getByState(state: string) {
        return new Promise((resolve, reject) => {
            if (state) {
                let indexArray: number[] = [];
                for (let i = 1; i < 25; i++) {
                    indexArray.push(i);
                }
                const REQUEST_PROMISE = (breweryData: Brewery[] = []) => {
                    console.log(indexArray);
                    const BREWERY_PROMISES: Promise<Brewery[]>[] = indexArray.map((element, index) => {
                        return new Promise((resolve, reject) => {
                            const URI = `https://api.openbrewerydb.org/breweries?by_state=${state}&page=${element}`
                            request
                                .get(URI)
                                .timeout(1000 * 10)
                                .then(res => {
                                    indexArray[index] += 24;
                                    if (res && res.body && res.body.length > 0) {
                                        resolve(res.body);
                                    } else {
                                        resolve([]);
                                    }

                                })
                                .catch(err=>{
                                    reject(err);
                                })
                        })
                    })
                    Promise.all(BREWERY_PROMISES)
                        .then((data: Brewery[][]) => {
                            const empty = data.findIndex(breweryData => {
                                return !(breweryData.length > 0)
                            });
                            let flattenArray: Brewery[] = [];
                            if (breweryData) {
                                flattenArray.push(...breweryData);
                            }
                            data.forEach(element => {
                                flattenArray.push(...element);
                            })
                            if (empty !== -1) {
                                resolve(flattenArray);
                            } else {
                                REQUEST_PROMISE(flattenArray);
                            }
                        }).catch(err=>{
                            reject(err);
                        })
                }
                REQUEST_PROMISE();
            } else {
                reject('No state provided');
            }
        });
    }

    /**Get all by brewery name */
    public getByName(name: string) {
        return new Promise((resolve, reject) => {
            if (name) {
                request
                    .get(`https://api.openbrewerydb.org/breweries?by_name=${name}`)
                    .timeout(1000 * 6)
                    .end((err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (res && res.body) {
                                resolve(res.body);
                            } else {
                                reject('No breweries found')
                            }
                        }
                    })
            } else {
                reject('No name provided');
            }
        });
    }

    /**Get all by tag I.E. "patio" */
    public getByTag(tag: string) {
        return new Promise((resolve, reject) => {
            if (name) {
                request
                    .get(`https://api.openbrewerydb.org/breweries?by_tag=${tag}`)
                    .timeout(1000 * 6)
                    .end((err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (res && res.body) {
                                resolve(res.body);
                            } else {
                                reject('No breweries found')
                            }
                        }
                    })
            } else {
                reject('No tag provided');
            }
        });
    }

}