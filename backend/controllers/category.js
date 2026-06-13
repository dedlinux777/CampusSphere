const Category = require('../models/category')

const engineeringCategories = [
    {
        name: 'Core Engineering',
        description: 'For mandatory divisional theory papers',
    },
    {
        name: 'Professional Elective',
        description: 'For deep-dive departmental alternatives',
    },
    {
        name: 'Open Elective',
        description: 'For inter-disciplinary curriculum options',
    },
    {
        name: 'Lab Practical',
        description: 'For laboratory workshops and experimental assessments',
    },
]

const engineeringCategoryNames = new Set(
    engineeringCategories.map((category) => category.name)
)

// get Random Integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

// ================ create Category ================
exports.createCategory = async (req, res) => {
    try {
        // extract data
        const { name, description } = req.body;
        const normalizedName = name?.trim();
        const normalizedDescription = description?.trim();

        // validation
        if (!normalizedName || !normalizedDescription) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (!engineeringCategoryNames.has(normalizedName)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category name',
            });
        }

        const categoryDetails = await Category.findOneAndUpdate(
            { name: normalizedName },
            { description: normalizedDescription },
            { new: true, upsert: true }
        )

        res.status(200).json({
            success: true,
            message: 'Category created successfully',
            data: categoryDetails,
        });
    }
    catch (error) {
        console.log('Error while creating Category');
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while creating Category',
            error: error.message
        })
    }
}


// ================ get All Category ================
exports.showAllCategories = async (req, res) => {
    try {
        const existingCategories = await Category.find(
            { name: { $in: [...engineeringCategoryNames] } },
            { name: true, description: true }
        )

        const existingCategoryNames = new Set(
            existingCategories.map((category) => category.name)
        )

        const missingCategories = engineeringCategories.filter(
            (category) => !existingCategoryNames.has(category.name)
        )

        if (missingCategories.length > 0) {
            await Category.insertMany(missingCategories)
        }

        // get all category from DB
        const allCategories = await Category.find(
            { name: { $in: [...engineeringCategoryNames] } },
            { name: true, description: true }
        )

        const categoriesByName = new Map(
            allCategories.map((category) => [category.name, category])
        )

        const orderedCategories = engineeringCategories
            .map((category) => categoriesByName.get(category.name))
            .filter(Boolean)

        // return response
        res.status(200).json({
            success: true,
            data: orderedCategories,
            message: 'All allCategories fetched successfully'
        })
    }
    catch (error) {
        console.log('Error while fetching all allCategories');
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while fetching all allCategories'
        })
    }
}



// ================ Get Category Page Details ================
exports.getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body
        // console.log("PRINTING CATEGORY ID: ", categoryId);

        // Get courses for the specified category
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: "ratingAndReviews",
            })
            .exec()

        // console.log('selectedCategory = ', selectedCategory)
        // Handle the case when the category is not found
        if (!selectedCategory) {
            // console.log("Category not found.")
            return res.status(404).json({ success: false, message: "Category not found" })
        }



        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
            // console.log("No courses found for the selected category.")
            return res.status(404).json({
                success: false,
                data: null,
                message: "No courses found for the selected category.",
            })
        }

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        })

        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
                ._id
        )
            .populate({
                path: "courses",
                match: { status: "Published" },
            })
            .exec()

        //console.log("Different COURSE", differentCategory)
        // Get top-selling courses across all categories
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
            })
            .exec()

        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)

        // console.log("mostSellingCourses COURSE", mostSellingCourses)
        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}