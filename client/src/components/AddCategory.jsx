// AddCategory.jsx
import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from '@/components/themeProvider';
import toast from 'react-hot-toast';
import { SketchPicker } from 'react-color';

const AddCategory = ({ onAddCategory }) => {
    const { theme } = useTheme();
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryColor, setNewCategoryColor] = useState('#fff');
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async () => {
        if (!newCategoryName.trim()) {
            toast.error('Category name is required');
            return;
        }

        // You can call the onAddCategory prop with the new category data
        onAddCategory({ name: newCategoryName, color: newCategoryColor });

        // Reset input values and close the modal
        setNewCategoryName('');
        setNewCategoryColor('#fff');
        setIsModalOpen(false);
    };

    const handleColorChange = (color) => {
        setNewCategoryColor(color.hex);
    };

    const themeClasses = theme === 'dark' ? {
        dialogBg: 'bg-black text-white',
        border: 'border-white',
        inputBg: 'bg-gray-700 text-white',
        inputBorder: 'border-gray-600',
        buttonBg: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
    } : {
        dialogBg: 'bg-white text-black',
        border: 'border-gray-300',
        inputBg: 'bg-white text-black',
        inputBorder: 'border-gray-300',
        buttonBg: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'
    };

    return (
        <>
            <button onClick={handleOpenModal} className='p-2 text-center bg-gray-800 w-full' >
                + Add Category
            </button>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className={`${themeClasses.dialogBg} rounded-lg p-6`}>
                    <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogDescription>Enter details for the new category.</DialogDescription>
                    </DialogHeader>
                    <CardContent className={themeClasses.dialogBg}>
                        <div className="flex flex-col space-y-1.5 mb-2">
                            <label htmlFor="categoryName">Category Name</label>
                            <input
                                id="categoryName"
                                type="text"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                className={`rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${themeClasses.inputBg} ${themeClasses.inputBorder}`}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <label htmlFor="categoryColor">Category Color</label>
                            <div>
                                <div
                                    onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                                    className="relative rounded-lg px-3 py-5 focus:outline-none focus:ring-2 cursor-pointer"
                                    style={{ backgroundColor: newCategoryColor }}
                                >
                                    <span className="px-1 text-black text-md rounded flex items-center justify-center">
                                        Click to change
                                    </span>
                                </div>
                                {isColorPickerOpen && (
                                    <SketchPicker
                                        color={newCategoryColor}
                                        onChange={handleColorChange}
                                    />
                                )}
                            </div>
                        </div>
                    </CardContent>
                    <DialogFooter className="flex justify-between mt-4">
                        <Button type="button" variant="outline" onClick={handleCloseModal}>Cancel</Button>
                        <Button type="button" className={themeClasses.buttonBg} onClick={handleSubmit}>Add Category</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddCategory;
