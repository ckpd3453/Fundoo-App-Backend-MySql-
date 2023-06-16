import sequelize, { DataTypes } from '../config/database';
import HttpStatus from 'http-status-codes';

const Note = require('../models/note').default(sequelize, DataTypes);

export const getAll = async () => {
  var response;
  const data = await Note.findAll();
  if (data != null) {
    response = {
      code: HttpStatus.OK,
      data: data,
      message: 'Note fetched Successfully'
    };
  } else {
    response = {
      code: HttpStatus.OK,
      data: null,
      message: 'Empty'
    };
  }
  return response;
};

export const create = async (body) => {
  console.log(body);
  var response;
  const data = await Note.create(body);
  if (data != null) {
    response = {
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note Saved Successfully'
    };
  } else {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: data,
      message: 'Client Side Error'
    };
  }
  return response;
};

export const getById = async (noteId, userId) => {
  var response;
  const data = await Note.findOne({
    where: {
      id: noteId,
      createdBy: userId
    }
  });
  if (data != null) {
    response = {
      code: HttpStatus.OK,
      data: data.dataValues,
      message: 'Note Retrived successfully'
    };
  } else {
    response = {
      code: HttpStatus.NOT_FOUND,
      data: null,
      message: 'Invalid Note Id'
    };
  }
  return response;
};

export const update = async (noteId, body) => {
  var response;

  const data = await Note.update(
    {
      title: body.title,
      description: body.description,
      colour: body.colour
    },
    {
      where: {
        id: noteId
      }
    }
  );

  if (data != null) {
    response = {
      code: HttpStatus.OK,
      data: data,
      message: 'Note Updated Successfully'
    };
  } else {
    response = {
      code: HttpStatus.NOT_FOUND,
      data: 'No Such Note Present for this user.',
      message: 'Note Id does not exist'
    };
  }
  return response;
};

export const deleteById = async (noteId, userId) => {
  var response;

  const data = await Note.findByPk(noteId);

  if (data != null) {
    const data = await Note.destroy({
      where: {
        id: noteId,
        userId: userId
      }
    });

    response = {
      code: HttpStatus.OK,
      data: 'Deleted',
      message: 'Note deleted successfully'
    };
  } else {
    response = {
      code: HttpStatus.NOT_FOUND,
      data: 'Not Deleted',
      message: 'Note Id does not exist'
    };
  }
  return response;
};

export const archive = async (req) => {
  console.log('note service req body', req);
  const noteId = req.params._id;
  const userId = req.body.userId;
  var response;
  const data = await getById(noteId, userId);
  if (data.data != null) {
    const isArchived = data.data[0].archive == false ? true : false;
    const registration = {
      title: data.data[0].title,
      description: data.data[0].description,
      colour: data.data[0].colour,
      archive: isArchived,
      trash: data.data[0].trash,
      userId: data.data[0].userId
    };
    const datas = await noteModel.findByIdAndUpdate(noteId, registration, {
      new: true
    });
    console.log(await client.del('getall'));

    response = {
      code: HttpStatus.OK,
      data: datas,
      message: 'Note Updated Successfully'
    };
  } else {
    response = {
      code: HttpStatus.NOT_FOUND,
      data: 'No Such Note Present for this user.',
      message: 'Note Id does not exist'
    };
  }
  return response;
};

export const trash = async (noteId, userId) => {
  var response;
  const data = await getById(noteId, userId);
  if (data.data != null) {
    const isTrashed = data.data[0].trash == false ? true : false;
    const registration = {
      title: data.data[0].title,
      description: data.data[0].description,
      colour: data.data[0].colour,
      archive: data.data[0].archive,
      trash: isTrashed,
      userId: data.data[0].userId
    };
    const datas = await noteModel.findByIdAndUpdate(noteId, registration, {
      new: true
    });
    console.log(await client.del('getall'));

    response = {
      code: HttpStatus.OK,
      data: datas,
      message: 'Note Updated Successfully'
    };
  } else {
    response = {
      code: HttpStatus.NOT_FOUND,
      data: 'No Such Note Present for this user.',
      message: 'Note Id does not exist'
    };
  }
  return response;
};
