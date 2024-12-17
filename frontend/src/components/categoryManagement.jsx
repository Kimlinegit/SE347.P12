// import React, { useState, useContext } from 'react';
// import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { GlobalState } from '../globalState';



// const CategoryManagement = () => {

//   const {categoryAPI} = useContext(GlobalState);
//   const {categories, createCategory, deleteCategory, updateCategory} = categoryAPI;
  
//   const [openAddDialog, setOpenAddDialog] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [editedCategory, setEditedCategory] = useState({});
//   const [newCategory, setNewCategory] = useState({});


//   const handleOpenAddDialog = () => {
//     setOpenAddDialog(true);
//   };

//   const handleCloseAddDialog = () => {
//     setOpenAddDialog(false);
//     setNewCategory({});
//   };
  

//   const handleAddCategory = () => {
//     createCategory(newCategory);
//     handleCloseAddDialog();
//   };

//   const handleOpenEditDialog = (category) => {
//     setEditedCategory(category);
//     setOpenEditDialog(true);
//   };

//   const handleCloseEditDialog = () => {
//     setOpenEditDialog(false);
//     setEditedCategory({});
//   };

//   console.log(editedCategory);

//   const handleEditCategory = async () => {
//     await updateCategory(editedCategory, editedCategory._id);
//     handleCloseEditDialog();
//   };

  

//   const handleDeleteCategory = (categoryId) => {
//     const confirmDelete = window.confirm("Bạn có chắc muốn xóa danh mục này không?");
//     if (confirmDelete) {
//       deleteCategory(categoryId);
//     }
    
//   };

//   console.log(categories);  

//   return (
//     <div>
//       <Typography variant="h5" gutterBottom>
//         Quản trị danh mục
//       </Typography>

//       {/* Table to display existing products */}
//       <TableContainer component={Paper} style={{ marginTop: '20px', height: '52vh', overflowY: 'auto' }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Tên</TableCell>
//               <TableCell>Mô tả</TableCell>
//               <TableCell>Thao tác</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {categories.map((category) => (
//               <TableRow key={category._id}>
//                 <TableCell>{category._id}</TableCell>
//                 <TableCell>{category.name}</TableCell>
//                 <TableCell>{category.description}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleOpenEditDialog(category)} color="primary">
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleDeleteCategory(category._id)} style={{color: 'red'}}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Button 
//         variant="contained" 
//         color="primary" 
//         style={{ marginTop: '20px' }}
//         onClick={handleOpenAddDialog}>
//         Thêm danh mục
//       </Button>

//       {/* Dialog for adding new product */}
//       <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
//         <DialogTitle>Thêm mới danh mục</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Tên"
//             fullWidth
//             style={{ marginTop: '10px' }}
//             value={newCategory.name}
//             onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
//           />
//           <TextField
//             label="Mô tả"
//             fullWidth
//             multiline
//             rows={4}
//             style={{ marginTop: '10px' }}
//             value={newCategory.description}
//             onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseAddDialog}>Hủy</Button>
//           <Button variant="contained" color="primary" onClick={handleAddCategory}>
//             Thêm
//           </Button>
//         </DialogActions>
//       </Dialog>
//       {/* Dialog for editing existing product */}
//       <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
//         <DialogTitle>Edit Category</DialogTitle>
//         <DialogContent>
//             <TextField
//                 label="Tên"
//                 fullWidth
//                 style={{ marginTop: '10px' }}
//                 value={editedCategory.name}
//                 onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })}
//             />
//             <TextField
//               label="Mô tả"
//               fullWidth
//               multiline
//               rows={4}
//               style={{ marginTop: '10px' }}
//               value={editedCategory.description}
//               onChange={(e) => setEditedCategory({ ...editedCategory, description: e.target.value })}
//             />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseEditDialog}>Hủy</Button>
//           <Button variant="contained" color="primary" onClick={handleEditCategory}>
//             Lưu
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default CategoryManagement;



//-----------------------------------Code trên đúng nhưng chưa áp dụng Command Design pattern-----------------------------------------------------


// CategoryManagement.js
import React, { useState, useContext } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GlobalState } from '../globalState.jsx';
import { 
    createCategoryCommand, 
    DeleteCategoryCommand, 
    UpdateCategoryCommand, 
    CommandInvoker,
} from '../designPattern/categoryCommand.jsx';

const CategoryManagement = () => {
    const state = useContext(GlobalState);
    const [categories] = state.categoryAPI.categories;
    const createCategory = state.categoryAPI.createCategory;
    const updateCategory = state.categoryAPI.updateCategory;
    const deleteCategory = state.categoryAPI.deleteCategory;
  
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editedCategory, setEditedCategory] = useState({});
    const [newCategory, setNewCategory] = useState({});
  
  
    const handleOpenAddDialog = () => {
        setOpenAddDialog(true);
    };
  
    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
        setNewCategory({});
    };
  
    const handleOpenEditDialog = (category) => {
        setEditedCategory(category);
        setOpenEditDialog(true);
    };
  
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setEditedCategory({});
    };
  
    const handleEditCategory = async () => {
        await updateCategory(editedCategory, editedCategory._id);
        handleCloseEditDialog();
    };
  
    const handleAddCategory = async () => {
        await createCategory(newCategory);
        handleCloseAddDialog();
    };
  
    const handleDeleteCategory = async (categoryId) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa danh mục này không?");
        if (confirmDelete) {
            await deleteCategory(categoryId);
        }
    };

  
    return (
        <div>
            <Typography variant="h5" align="center" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
                Quản trị danh mục
            </Typography>
  
            {/* Table to display existing products */}
            <TableContainer component={Paper} style={{ marginTop: '20px', height: '52vh', overflowY: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>Mô tả</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category._id}>
                                <TableCell>{category._id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.description}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpenEditDialog(category)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteCategory(category._id)} style={{color: 'red'}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button 
                variant="contained" 
                color="primary" 
                style={{ marginTop: '10px' }}
                onClick={handleOpenAddDialog}>
                Thêm danh mục
            </Button>
  
            {/* Dialog for adding new product */}
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
                <DialogTitle>Thêm mới danh mục</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Tên"
                        fullWidth
                        style={{ marginTop: '10px' }}
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    />
                    <TextField
                        label="Mô tả"
                        fullWidth
                        multiline
                        rows={4}
                        style={{ marginTop: '10px' }}
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog}>Hủy</Button>
                    <Button variant="contained" color="primary" onClick={handleAddCategory}>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Dialog for editing existing product */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Tên"
                        fullWidth
                        style={{ marginTop: '10px' }}
                        value={editedCategory.name}
                        onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })}
                    />
                    <TextField
                        label="Mô tả"
                        fullWidth
                        multiline
                        rows={4}
                        style={{ marginTop: '10px' }}
                        value={editedCategory.description}
                        onChange={(e) => setEditedCategory({ ...editedCategory, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Hủy</Button>
                    <Button variant="contained" color="primary" onClick={handleEditCategory}>
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CategoryManagement;




