import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { userRoutes } from "./routes/user/user_routes";
import { taskRoutes } from "./routes/task/task_routes";
import { auditoryRoutes } from "./routes/auditory/auditory_routes";

const app = new Elysia()

  //* Middleware to log the request
  .onRequest(({ request }) => {
    const { method, url } = request;
    const start = performance.now();
    Reflect.set(request, "__startTime", start);
    console.log(`📥 ${method} ${url}`);
  })

  //* Middleware to log the response
  .onAfterHandle(({ request, response }) => {
    const start = Reflect.get(request, "__startTime" || performance.now());
    const duration = performance.now() - start;
    const time =
      duration > 1000
        ? `${(duration / 1000).toFixed(2)}s`
        : `${duration.toFixed(2)}ms`;
    console.log(
      `✅ ${request.method} ${request.url} - ${
        (response as any)?.status ?? 200
      } - ⏱️ ${time}`
    );
  })

  //* Middleware to log the error
  .onError(({ code, error, request }) => {
    console.error(`❌ Error en ${request.method} ${request.url} - ${code}`);
    console.error(error);
    return {
      status: "error",
      message: "message" in error ? error.message : "Unknown error occurred",
    };
  })

  //* Swagger documentation
  .use(
    swagger({
      provider: "scalar",
      theme: "dark",
      path: "/swagger",
      version: "0.0.1",
      documentation: {
        info: {
          title: "Global News Time Report Service",
          version: "0.0.1",
          description:
            "This API is used to get the time report of the global news",
          contact: {
            name: "Alejandro Mateus Martinez",
            url: "https://github.com/RMdavidmatheus/",
            email: "david.5.12@hotmail.com",
          },
          license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT",
          },
        },
        servers: [
          {
            url: "http://localhost:3000",
            description: "Local server",
          },
          {
            url: "https://global-news-form-service-elysia.onrender.com",
            description: "Production server",
          },
        ],
      },
    })
  )

  //* Cors middleware
  .use(
    cors({
      origin: ["*"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
      maxAge: 86400,
    })
  )

  //* User routes
  .use(userRoutes)
  .use(taskRoutes)
  .use(auditoryRoutes)

  //* Listen to port 3000
  .listen(process.env.PORT_APP || 3000);

//* Log the service running and the available endpoints
console.log(`Service running at ${app.server?.url} 🚀🚀🚀`);

//* Log the available endpoints
console.log(`📡 Available endpoints:`);
app.routes.forEach((route) => {
  console.log(`🟢 [${route.method}] ${route.path}`);
});
