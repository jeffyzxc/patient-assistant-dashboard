import { Patient } from "../config/db.sync.js";

export const emailPatientValidator = async (email) => {
    const existingUser = await Patient.findOne({ where: { email } });

    if (existingUser) {
      throw new Error('Email already exists');
    }
}
