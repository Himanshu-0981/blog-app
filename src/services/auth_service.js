import { Client, Account, ID } from "appwrite";

import { env_config } from "../config/env_config";

export class AuthService {
  client = new Client();
  account;

  /*
    Here, using the constructor method because whenever the method
    is being called, then endpoints will be set automatically in
    the time of object creation
  */

  constructor() {
    this.client
      // endpoints
      .setEndpoint(env_config.appwriteUrl)
      .setProject(env_config.appwriteProjectID);
    this.account = new Account(this.client);
  }

  // signUp method
  async createAccount({ email, password, name }) {
    const id = ID.unique();
    try {
      const userAccount = await this.account.create(id, email, password, name);
      // checking if account created or not
      if (!userAccount) return userAccount || null;
      // If the account is created successfully, invoke the login method.
      this.login(email, password);
    } catch (err) {
      throw new Error("some error while signup :: ", err);
    }
  }

  // signIn method
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (err) {
      throw new Error("some error while login :: ", err);
    }
  }

  // checking current user
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user || null; // null incase user not found
    } catch (err) {
      throw new Error("error :: ", err);
    }
  }
  // logout method
  logout() {
    const promise = this.account.deleteSessions();
    promise
      .then((res) => console.log(res, "logout success"))
      .catch((err) =>
        console.log("something went wrong while logout :: ", err)
      );
  }
}

const authService = new AuthService();

export default authService;
