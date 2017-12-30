// @flow
export default {
  findRecordById(
    records: Object,
    id: string | number
  ): Object | null {
    let record = records.filter((record) => Number(record.id) === Number(id));
    if (record.length) {
      return record[0];
    }
    return null;
  },

  /**
   * Builds a GET request for an AJAX call via axios.
   * Mostly just a shortcut to save writing everything out over and over
   */
  axGet(url: string, authToken?: string) {
    let req: any = {
      method: 'get',
      headers: {
        Accept: 'application/json',
      },
      url,
    };

    if (authToken) {
      req.headers['Authorization'] = `${authToken}`;
    }

    return req;
  },

  /**
   * Builds a POST request for an AJAX call via axios.
   */
  axPost(url: string, data: Object, authToken?: string) {
    let req: any = {
      method: 'post',
      headers: {
        Accept: 'application/json',
      },
      url,
      data,
    };

    if (authToken) {
      req.headers['Authorization'] = `${authToken}`;
    }

    return req;
  },

  /**
   * Builds a PUT request for an AJAX call via axios.
   * Note that this simply uses the POST method build, and then changes the method.
   */
  axPut(url: string, data: Object, authToken?: string) {
    let req: any = this.axPost(url, data, authToken);
    req.method = 'put';
    return req;
  },

  /**
   * Builds a DELETE request for an AJAX call via axios.
   * Note that this simply uses the POST method build, and then changes the method.
   */
  axDelete(url: string, data: Object, authToken?: string) {
    let req: any = this.axPost(url, data, authToken);
    req.method = 'delete';
    return req;
  },
};
