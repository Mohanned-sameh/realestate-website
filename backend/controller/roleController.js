const Role = require('../models/roleModel');
const { asyncHandler } = require('../middleware/asyncHandler');
const { validateObjectId } = require('../middleware/asyncHandler');

// add a new role
exports.addRole = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // Check if the role already exists
  const role = await Role.findOne({ name });
  if (role) {
    return res.status(400).json({ message: 'Role already exists' });
  }

  // Create the role
  const newRole = await Role.create({
    name,
    description,
  });

  res.status(201).json({
    status: 'success',
    data: {
      role: newRole,
    },
  });
});

// Get all roles
exports.getRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find();

  res.status(200).json({
    status: 'success',
    data: {
      roles,
    },
  });
});

// Get a single role by ID
exports.getRole = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);
  if (!role) {
    return res.status(404).json({ message: 'Role not found' });
  }

  res.status(200).json({
    status: 'success',
    data: {
      role,
    },
  });
});

// Update a role
exports.updateRole = asyncHandler(async (req, res) => {
  if (!validateObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  const role = await Role.findById(req.params.id);
  if (!role) {
    return res.status(404).json({ message: 'Role not found' });
  }

  const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      role: updatedRole,
    },
  });
});

// Delete a role
exports.deleteRole = asyncHandler(async (req, res) => {
  if (!validateObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  const role = await Role.findById(req.params.id);
  if (!role) {
    return res.status(404).json({ message: 'Role not found' });
  }

  await Role.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
