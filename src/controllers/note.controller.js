import * as noteService from '../services/note.service';

export const getAll = async (req, res, next) => {
  try {
    const data = await noteService.getAll();
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const data = await noteService.create(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res) => {
  const data = await noteService.getById(req.params._id, req.body.userId);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

export const update = async (req, res) => {
  const data = await noteService.update(req.params._id, req.body);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

export const deleteById = async (req, res) => {
  const data = await noteService.deleteById(req.params._id, req.body.userId);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

export const trash = async (req, res) => {
  const data = await noteService.trash(req.params._id, req.body.userId);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

export const archive = async (req, res) => {
  const data = await noteService.archive(req);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};
