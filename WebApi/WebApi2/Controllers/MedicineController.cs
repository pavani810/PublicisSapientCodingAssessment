using Microsoft.AspNetCore.Mvc;
using PharmacyAPI.Models;
using PharmacyAPI.Services;
using Microsoft.AspNetCore.Cors;

namespace PharmacyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    public class MedicinesController : ControllerBase
    {
        private readonly JsonFileService<Medicine> _service;

        public MedicinesController(JsonFileService<Medicine> service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll([FromQuery] string? search)
        {
            var list = _service.ReadAll();
            if (!string.IsNullOrEmpty(search))
                list = list.Where(m => m.FullName.Contains(search, StringComparison.OrdinalIgnoreCase)).ToList();
            return Ok(list);
        }

        [HttpPost]
        public IActionResult Add([FromBody] Medicine medicine)
        {
            var list = _service.ReadAll();
            medicine.Id = Guid.NewGuid().ToString();
            list.Add(medicine);
            _service.WriteAll(list);
            return Ok(medicine);
        }
    }
}
