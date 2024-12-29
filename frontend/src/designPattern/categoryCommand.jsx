
// commands.js
class Command {
    execute() {}
}
  
// Concrete commands

class createCategoryCommand extends Command {
    constructor({createCategory, newCategory}) {
        super();
        this.createCategory = createCategory;
        this.newCategory = newCategory;
    }
    execute() {
        this.createCategory(this.newCategory);
    }
}

class DeleteCategoryCommand extends Command {
    constructor(deleteCategory, categoryId) {
        super();
        this.deleteCategory = deleteCategory;
        this.categoryId = categoryId;
    }
    execute() {
        this.deleteCategory(this.categoryId);
    }
}

class UpdateCategoryCommand extends Command {
    constructor({updateCategory, editedCategory})  {
        this.updateCategory = updateCategory;
        this.editedCategory = editedCategory;
    }
    execute() {
        this.updateCategory(this.editedCategory, this.editedCategory._id);
    }
}

// Invoker
class CommandInvoker {
    // constructor({command}) {
    //     this.command = null;
    // }
    setCommand(command) {
        this.command = command;
    }

    executeCommand() {
      if(this.command) {
        this.command.execute();
      }
    }
}

// Receiver
// class Receiver {
//     constructor(createCategory, updateCategory, deleteCategory) {
//         this.createCategory = createCategory;
//         this.updateCategory = updateCategory;
//         this.deleteCategory = deleteCategory;
//     }
//     createCategory(newCategory) {
//         this.createCategory(newCategory);
//     }
//     updateCategory(categoryId) {
//         this.updateCategory(categoryId);
//     }
//     deleteCategory(categoryId) {
//         this.deleteCategory(categoryId);
//     }
// }
// class CreateCategoryCommand extends Command {
// execute() {
//     this.createCategory(this.newCategory);
// }

// setData({ createCategory, newCategory }) {
//     this.createCategory = createCategory;
//     this.newCategory = newCategory;
// }
// }

// class DeleteCategoryCommand extends Command {
// execute() {
//     this.deleteCategory(this.categoryId);
// }

// setData({ deleteCategory, categoryId }) {
//     this.deleteCategory = deleteCategory;
//     this.categoryId = categoryId;
// }
// }

// class UpdateCategoryCommand extends Command {
//     execute() {
//         this.updateCategory(this.editedCategory, this.categoryId);
//     }

//     setData({ updateCategory, editedCategory, categoryId }) {
//         this.updateCategory = updateCategory;
//         this.editedCategory = editedCategory;
//         this.categoryId = categoryId;
//     }
// }

// invoker.js
// class CommandInvoker {
//     executeCommand(command, data) {
//       command.setData(data);
//       command.execute();
//     }
// }

export { createCategoryCommand, DeleteCategoryCommand, UpdateCategoryCommand, CommandInvoker };
