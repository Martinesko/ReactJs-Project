﻿using Microsoft.CodeAnalysis.CSharp.Syntax;
using Shop.Data.Models;
using Shop.Models.Category;
using Shop.Models.Color;
using Shop.Models.Model;
using Shop.Models.ModelType;

namespace Shop.Models.Product
{
    public class AddProductViewModel
    {
        public int MakeId { get; set; }

        public int ModelTypeId { get; set; }

        public int CategoryId { get; set; }

        public int Quantity { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public int ColorId { get; set; }

        public decimal Price { get; set; }

        public ICollection<MakeViewModel> Makes { get; set; } = new List<MakeViewModel>();

        public ICollection<ModelTypeViewModel> ModelTypes { get; set; } = new List<ModelTypeViewModel>();

        public ICollection<ProductColorViewModel> Colors { get; set; } = new List<ProductColorViewModel>();

        public ICollection<ProductCategoryViewModel> Categories { get; set; } = new List<ProductCategoryViewModel>();

    }
}
