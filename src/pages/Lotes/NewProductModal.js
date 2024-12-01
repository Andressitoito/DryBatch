import React, { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

const NewProductModal = ({ isOpen, onClose, addProduct }) => {
  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      productName: "",
      productCode: "",
      containers: [{ tare: "", initialGross: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "containers",
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        productName: "",
        productCode: "",
        containers: [{ tare: "", initialGross: "" }],
      });
    }
  }, [isOpen, reset]);

  const onSubmit = (data) => {
    if (data.productName && data.productCode && data.containers.every(c => c.tare && c.initialGross)) {
      addProduct(data);
      onClose();
    } else {
      alert("Por favor complete todos los campos para crear un nuevo producto.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Producto</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-1">Nombre del Producto</label>
            <Controller
              name="productName"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`border p-2 w-full ${errors.productName ? 'border-red-500' : ''}`}
                  placeholder="Ingrese el nombre del producto"
                />
              )}
            />
            {errors.productName && (
              <span className="text-red-500 text-sm">{errors.productName.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Lote de Producto</label>
            <Controller
              name="productCode"
              control={control}
              rules={{ 
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^\d{5}$/,
                  message: "Ingrese un lote de producto válido (00000 - 99999)",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`border p-2 w-full ${errors.productCode ? 'border-red-500' : ''}`}
                  placeholder="Ingrese el lote del producto (00000 - 99999)"
                />
              )}
            />
            {errors.productCode && (
              <span className="text-red-500 text-sm">{errors.productCode.message}</span>
            )}
          </div>
          <h3 className="text-lg font-bold mb-2">Bandejas</h3>
          {fields.map((container, index) => (
            <div key={container.id} className="mb-2">
              <label className="block mb-1">Tara de la Bandeja {index + 1} (kg)</label>
              <Controller
                name={`containers.${index}.tare`}
                control={control}
                rules={{
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^[0-9]+(\.[0-9]*)?$/,
                    message: "Ingrese un número válido",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className={`border p-2 w-full mb-2 ${errors?.containers?.[index]?.tare ? 'border-red-500' : ''}`}
                    placeholder="Ingrese la tara de la bandeja"
                  />
                )}
              />
              {errors?.containers?.[index]?.tare && (
                <span className="text-red-500 text-sm">{errors.containers[index].tare.message}</span>
              )}
              <label className="block mb-1">Peso Bruto Inicial (kg)</label>
              <Controller
                name={`containers.${index}.initialGross`}
                control={control}
                rules={{
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^[0-9]+(\.[0-9]*)?$/,
                    message: "Ingrese un número válido",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className={`border p-2 w-full ${errors?.containers?.[index]?.initialGross ? 'border-red-500' : ''}`}
                    placeholder="Ingrese el peso bruto inicial"
                  />
                )}
              />
              {errors?.containers?.[index]?.initialGross && (
                <span className="text-red-500 text-sm">{errors.containers[index].initialGross.message}</span>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ tare: "", initialGross: "" })}
            className="bg-secondary text-white p-2 rounded mt-2"
          >
            + Agregar Bandeja
          </button>
          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded mr-2">
              Cancelar
            </button>
            <button type="submit" className="bg-primary text-white p-2 rounded">
              Crear Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProductModal;


I want to build the backend of my web application called "DryBatch". It will be used to track the drying process of products in a pilot plant. This backend should be built using **Node.js** and **Express** and should connect to an **SQL database** (e.g., PostgreSQL, SQLite, or MySQL). I need you to help me create a well-structured backend with the following requirements:

### **Backend Overview**
- The backend will have a well-structured directory layout as follows:

/src
  /routes
    auth.js           # Login and session management
    products.js       # CRUD operations for products and batches
    export.js         # Excel export routes
  /models
    User.js           # User model (SQL table)
    Product.js        # Product model (SQL table)
    Batch.js          # Measurement model (SQL table)
  /utils
    excelExporter.js  # Utility for creating Excel files
  index.js            # Backend entry point

  - The backend must manage user authentication, product/batch CRUD operations, and data exportation.

  ---
  
  ### **1. Requirements for Each File**
  
  #### **1.1. `index.js` (Backend Entry Point)**
  - Set up an **Express server**.
  - Import routes (`auth`, `products`, `export`).
  - Use middleware for **JSON parsing** and **CORS**.
  - Connect to an **SQL database** using an ORM (e.g., Sequelize or Knex).
  
  #### **1.2. `/routes/auth.js` (Login and Session Management)**
  - Implement **session-based authentication** (using something like **express-session**).
  - Create a **login endpoint (`/login`)**:
  - Validate user credentials (username and password).
  - Use **bcrypt** for hashing and comparing passwords.
  - Store session information to keep users logged in.
  - Create a **logout endpoint (`/logout`)** to end user sessions.
  - Users must be **manually created** in the database (no user signup feature).
  
  #### **1.3. `/routes/products.js` (CRUD Operations for Products and Batches)**
  - **Endpoints** for managing products and batches:
  - **`GET /products`**: Retrieve all products (name, code).
  - **`POST /products`**: Create a new product.
  - **`GET /products/:id`**: Retrieve a specific product and its batches.
  - **`PUT /products/:id`**: Update product information.
  - **`DELETE /products/:id`**: Delete a product.
  - CRUD for **batches/measurements** under a product:
  - **`POST /products/:productId/batches`**: Add a new batch for a product.
  - **`GET /products/:productId/batches`**: Retrieve all batches under a product.
  - **`PUT /batches/:batchId`**: Update measurements (e.g., weight, timestamp, editor).
  - **`DELETE /batches/:batchId`**: Delete a batch.
  
  #### **1.4. `/routes/export.js` (Excel Export Routes)**
  - Create routes to handle **Excel export** for batches and products:
  - **`GET /export/product/:productId`**: Export all data for a specific product to Excel.
  - **`GET /export/batch/:batchId`**: Export data for a single batch.
  - Use a utility function from `/utils/excelExporter.js` to generate Excel files.
  
  ---
  
  ### **2. Database Models in `/models`**
  
  #### **2.1. User.js (User Model)**
  - Define a **User** model representing the users of the application.
  - Fields:
  - **`id`** (primary key, auto-increment).
  - **`username`** (unique, string).
  - **`password`** (hashed string using bcrypt).
  - **`createdAt`**, **`updatedAt`** (timestamps).
  
  #### **2.2. Product.js (Product Model)**
  - Define a **Product** model to represent the different products tracked in the app.
  - Fields:
  - **`id`** (primary key, auto-increment).
  - **`name`** (string, name of the product).
  - **`code`** (unique code to identify the product).
  - **`createdAt`**, **`updatedAt`** (timestamps).
  
  #### **2.3. Batch.js (Batch/Measurement Model)**
  - Define a **Batch** model to represent different measurement entries for each product.
  - Fields:
  - **`id`** (primary key, auto-increment).
  - **`productId`** (foreign key linking to the Product table).
  - **`containerName`** (e.g., "Container A").
  - **`tareWeight`** (decimal).
  - **`initialGrossWeight`** (decimal).
  - **`currentGrossWeight`** (decimal, can be updated).
  - **`netWeight`** (calculated field: `grossWeight - tareWeight`).
  - **`weightLoss`** (calculated field: initial net weight - current net weight).
  - **`lastUpdatedBy`** (username of the last editor).
  - **`timestamp`** (when the batch was last updated).
  - **`createdAt`**, **`updatedAt`** (timestamps).
  
  ---
  
  ### **3. Utilities in `/utils`**
  
  #### **3.1. `excelExporter.js` (Excel Export Utility)**
  - Create a utility function for **exporting data to Excel**.
  - Use a library like **xlsx** or **exceljs**:
  - Accept data in JSON format.
  - Generate an Excel file with appropriate columns for the product or batch.
  - Save the file temporarily or return it as a downloadable response.
  
  ---
  
  ### **4. Dependencies**
  Include the following dependencies in `package.json`:
  - **express**: For creating server and routes.
  - **express-session**: For session management.
  - **bcrypt**: For hashing passwords.
  - **sequelize** or **knex**: ORM for SQL database interactions.
  - **pg**, **sqlite3**, or **mysql2**: The database driver.
  - **cors**: Middleware for handling cross-origin requests.
  - **exceljs** or **xlsx**: For creating Excel files.
  - **dotenv**: For managing environment variables (e.g., database credentials).
  
  ---
  
  ### **5. Detailed File Descriptions and Deliverables**
  
  1. **`index.js`**: 
   - Set up Express and import the routes.
   - Establish a database connection using Sequelize or Knex.
   - Start the server on a specified port.
  
  2. **`/routes/auth.js`**:
   - Provide login and logout endpoints.
   - Implement session-based authentication.
  
  3. **`/routes/products.js`**:
   - Implement CRUD operations for products and batches.
   - Ensure validation (e.g., product names should not be empty).
  
  4. **`/routes/export.js`**:
   - Implement routes to export batch/product data to Excel.
   - Use the utility function from `excelExporter.js`.
  
  5. **`/models`**:
   - Create Sequelize models for **User**, **Product**, and **Batch**.
   - Define relationships (e.g., a product has many batches).
  
  6. **`/utils/excelExporter.js`**:
   - Write a function that generates an Excel file from product or batch data.
   - Include descriptive column headers matching the data fields.
  
  7. **Include Mock Data for Testing**:
   - Add initial mock data for users, products, and batches.
   - Provide sample user credentials for testing login.
  
  Please provide the complete code for each of the above files with appropriate comments explaining how they work. Make sure to follow best practices for security and maintainability (e.g., hashing passwords, validating input, avoiding SQL injections). I would like all the necessary configuration to easily connect to an SQL database like PostgreSQL or SQLite.
  