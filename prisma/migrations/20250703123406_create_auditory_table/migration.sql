-- CreateTable
CREATE TABLE "auditory" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_task" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "auditory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auditory_id_user_key" ON "auditory"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "auditory_id_task_key" ON "auditory"("id_task");

-- AddForeignKey
ALTER TABLE "auditory" ADD CONSTRAINT "auditory_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditory" ADD CONSTRAINT "auditory_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
