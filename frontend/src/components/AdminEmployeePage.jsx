// AdminEmployeePage.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const AdminEmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await axiosInstance.get("/employees/");
      setEmployees(response.data);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Edit employee
  const handleEdit = (employee) => {
    setEditingEmployee(employee.id);
    setFormData({ name: employee.name, email: employee.email });
    setIsModalOpen(true);
    setIsAddMode(false);
  };

  // Add employee
  const handleAdd = () => {
    setFormData({ name: "", email: "" });
    setIsModalOpen(true);
    setIsAddMode(true);
  };

  // Save (Edit or Add)
  const handleSave = async () => {
    try {
      if (isAddMode) {
        const response = await axiosInstance.post("/employees/add/", formData);
        setEmployees([...employees, response.data.employee]);
        toast.success("Employee added successfully");
      } else {
        const response = await axiosInstance.put(
          `/employees/${editingEmployee}/update/`,
          formData
        );
        setEmployees(
          employees.map((emp) =>
            emp.id === editingEmployee ? response.data.employee : emp
          )
        );
        toast.success("Employee updated successfully");
      }
      setIsModalOpen(false);
      setEditingEmployee(null);
    } catch (error) {
      toast.error(
        error.response?.data?.email ||
          error.response?.data?.detail ||
          "Something went wrong"
      );
    }
  };

  // Delete employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axiosInstance.delete(`/employees/${id}/delete/`);
      setEmployees(employees.filter((emp) => emp.id !== id));
      toast.success("Employee deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to delete employee");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <h1 className="text-2xl font-bold mb-6 text-center">Employee Management</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Employee
        </button>
      </div>

      <div className={`overflow-x-auto ${isModalOpen ? "filter blur-sm" : ""}`}>
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b">
                <td className="py-3 px-6">{emp.name}</td>
                <td className="py-3 px-6">{emp.email}</td>
                <td className="py-3 px-6 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(emp)}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">
              {isAddMode ? "Add Employee" : "Edit Employee"}
            </h2>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border rounded px-2 py-1 mt-1"
              />
            </label>
            <label className="block mb-4">
              Email:
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border rounded px-2 py-1 mt-1"
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {isAddMode ? "Add" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmployeePage;
