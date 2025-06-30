-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "adress_number" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_by_user" INTEGER NOT NULL,
    "updated_by_user" INTEGER NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dumpsters" (
    "id" SERIAL NOT NULL,
    "identifier_number" TEXT NOT NULL,
    "current_location" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_by_user" INTEGER NOT NULL,
    "updated_by_user" INTEGER NOT NULL,

    CONSTRAINT "dumpsters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "residues" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_by_user" INTEGER NOT NULL,
    "updated_by_user" INTEGER NOT NULL,

    CONSTRAINT "residues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rent" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "dumpster_id" INTEGER NOT NULL,
    "residue_id" INTEGER NOT NULL,
    "rent_date" TIMESTAMP(3) NOT NULL,
    "delivery_date" TIMESTAMP(3) NOT NULL,
    "status_id" INTEGER NOT NULL,
    "created_by_user" INTEGER NOT NULL,
    "updated_by_user" INTEGER NOT NULL,

    CONSTRAINT "rent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operations" (
    "id" SERIAL NOT NULL,
    "rent_id" INTEGER NOT NULL,
    "driver_name" TEXT NOT NULL,
    "operation_type" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "status_id" INTEGER NOT NULL,
    "created_by_user" INTEGER NOT NULL,
    "updated_by_user" INTEGER NOT NULL,

    CONSTRAINT "operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_created_by_user_fkey" FOREIGN KEY ("created_by_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_updated_by_user_fkey" FOREIGN KEY ("updated_by_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dumpsters" ADD CONSTRAINT "dumpsters_created_by_user_fkey" FOREIGN KEY ("created_by_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dumpsters" ADD CONSTRAINT "dumpsters_updated_by_user_fkey" FOREIGN KEY ("updated_by_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "residues" ADD CONSTRAINT "residues_created_by_user_fkey" FOREIGN KEY ("created_by_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "residues" ADD CONSTRAINT "residues_updated_by_user_fkey" FOREIGN KEY ("updated_by_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent" ADD CONSTRAINT "rent_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent" ADD CONSTRAINT "rent_dumpster_id_fkey" FOREIGN KEY ("dumpster_id") REFERENCES "dumpsters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent" ADD CONSTRAINT "rent_residue_id_fkey" FOREIGN KEY ("residue_id") REFERENCES "residues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent" ADD CONSTRAINT "rent_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent" ADD CONSTRAINT "rent_created_by_user_fkey" FOREIGN KEY ("created_by_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent" ADD CONSTRAINT "rent_updated_by_user_fkey" FOREIGN KEY ("updated_by_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operations" ADD CONSTRAINT "operations_rent_id_fkey" FOREIGN KEY ("rent_id") REFERENCES "rent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operations" ADD CONSTRAINT "operations_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operations" ADD CONSTRAINT "operations_created_by_user_fkey" FOREIGN KEY ("created_by_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operations" ADD CONSTRAINT "operations_updated_by_user_fkey" FOREIGN KEY ("updated_by_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
