import moment from "moment";
import { db } from "../db";

export const createRentService = async (data: any) => {
  try {
    const response = await db.$transaction(async (transaction) => {
      const rent = await transaction.rent.create({
        data: {
          client_id: Number(data.client_id),
          dumpster_id: Number(data.dumpster_id),
          residue_id: Number(data.residue_id),
          status_id: Number(data.status_id),
          rent_date: moment(data.rent_date).toDate(),
          delivery_date: moment(data.delivery_date).toDate(),
          created_by_user: data.created_by_user,
          updated_by_user: data.updated_by_user,
        },
      });

      const operation = await transaction.operations.create({
        data: {
          rent_id: rent.id,
          driver_name: data.driver_name,
          operation_type: data.operation_type,
          date: moment(data.date).toDate(),
          location_id: Number(data.location_id),
          destination: data.destination,
          comments: data.comments,
          status_id: Number(data.status_id),
          created_by_user: data.created_by_user,
          updated_by_user: data.updated_by_user,
        },
      });

      return {
        rent,
        operation,
      }
    });

    return response;
  } catch (error) {
    console.error(error, 'error')
    throw error;
  }
};