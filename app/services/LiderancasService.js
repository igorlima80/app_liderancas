import * as http from "tns-core-modules/http";
import BackendService from "./BackendService";

export default class LiderancasService extends BackendService {
  notifications() {
    return http
      .request({
        url: this.baseUrl + "notifications",
        method: "GET",
        headers: this.getHeaders()
      })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info("Notifications: " + data);
        return data;
      });
  }

  leader() {
    return http
      .request({
        url: this.baseUrl + "leader",
        method: "GET",
        headers: this.getHeaders()
      })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info("Leader: " + data);
        return data;
      });
  }

  updateLeader(leader) {
    return http
      .request({
        url: `http://app.liderancas.net.br/api/leaders/${leader.id}`,
        method: "PUT",
        headers: this.getHeaders(),
        content: JSON.stringify({ address: leader.address })
      })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info("Leader: " + data);
        return data;
      });
  }

  voters(leader_id) {
    return http
      .request({
        // url: this.baseUrl + "voters",
        url: `http://app.liderancas.net.br/api/leaders/${leader_id}/members`,
        method: "GET",
        headers: this.getHeaders()
      })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info("Members: " + data);
        return data;
      });
  }

  nearMembers(info) {
    console.log(info);
    
    return http
      .request({
        // url: this.baseUrl + "voters",
        url: "http://app.liderancas.net.br/api/members/find",
        method: "POST",
        headers: this.getHeaders(),
        content: JSON.stringify(info)
      })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info("Members: " + data);
        return data;
      });
  }

  unvisitedMembers(info) {
    return http
      .request({
        // url: this.baseUrl + "voters",
        url: "http://app.liderancas.net.br/api/members/find_unvisited",
        method: "POST",
        headers: this.getHeaders(),
        content: JSON.stringify(info)
      })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info("Members: " + data);
        return data;
      });
  }

  updateVoter(voter) {
    return http
      .request({
        // url: this.baseUrl + "voterupdate",
        url: `http://app.liderancas.net.br/api/members/${voter.member.id}`,
        method: "PUT",
        headers: this.getHeaders(),
        content: JSON.stringify(voter)
      })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info("Voter: " + data);
        return data;
      });
  }

  addVoter(voter) {
    return http
      .request({
        url: `http://app.liderancas.net.br/api/members`,
        method: "POST",
        headers: this.getHeaders(),
        content: JSON.stringify(voter)
      })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info("Voter: " + data);
        return data;
      });
  }

  visits(voter_id) {
    return http
      .request({
        // url: this.baseUrl + "visits",
        url: `http://app.liderancas.net.br/api/visits/find_by_member`,
        method: "POST",
        headers: this.getHeaders(),
        content: JSON.stringify({
          id: voter_id
        })
      })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info("Visits: " + data);
        return data;
      });
  }

  updateVisit(visit) {
    return http
      .request({
        url: this.baseUrl + "visitupdate",
        method: "POST",
        headers: this.getHeaders(),
        content: JSON.stringify({
          visit: visit
        })
      })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info("Visit: " + data);
        return data;
      });
  }

  addVisit(visit) {
    return http
      .request({
        // url: this.baseUrl + "visitadd",
        url: `http://app.liderancas.net.br/api/visits`,
        method: "POST",
        headers: this.getHeaders(),
        content: JSON.stringify({visit: visit})
      })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info("Visit: " + data);
        return data;
      });
  }

  getCities(description) {
    return http
      .request({
        // url: this.baseUrl + "voters",
        url: "http://app.liderancas.net.br/api/cities/find",
        method: "POST",
        headers: this.getHeaders(),
        content: JSON.stringify({description: description})
      })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info("Cidades: " + data);
        return data;
      });
  }

  findByZipcode(zipcode) {
    return http
      .request({
        // url: this.baseUrl + "voters",
        url: "http://app.liderancas.net.br/api/utils/zipcode",
        method: "POST",
        headers: this.getHeaders(),
        content: JSON.stringify({zipcode: zipcode})
      })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info("Cidade: " + data);
        return data;
      });
  }

  findCityByIbge(ibge) {
    return http
      .request({
        // url: this.baseUrl + "voters",
        url: "http://app.liderancas.net.br/api/cities/find_by_ibge",
        method: "POST",
        headers: this.getHeaders(),
        content: JSON.stringify({ibge: ibge})
      })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info("Cidade: " + data);
        return data;
      });
  }

  getHeaders(toAppend = {}) {
    return Object.assign(
      {
        "Content-Type": "application/json",
        Authorization: "Basic " + this.token
      },
      toAppend
    );
  }


}
